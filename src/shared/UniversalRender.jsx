/* eslint react/display-name: 0 */
/* eslint space-before-function-paren:0 */
// https://github.com/eslint/eslint/issues/4442
import Iso from 'iso';
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import {
    Router,
    RouterContext,
    match,
    applyRouterMiddleware,
    browserHistory,
} from 'react-router';
import { Provider } from 'react-redux';

import RootRoute from 'app/RootRoute';
import * as appActions from 'app/redux/AppReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { useScroll } from 'react-router-scroll';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from 'app/redux/RootReducer';
import rootSaga from 'shared/RootSaga';
import { component as NotFound } from 'app/components/pages/NotFound';
import extractMeta from 'app/utils/ExtractMeta';
import Translator from 'app/Translator';
import { routeRegex } from 'app/ResolveRoute';
import ScrollBehavior from 'scroll-behavior';
import { callBridge, getStateAsync, getContentAsync } from 'app/utils/steemApi';

let get_state_perf,
    get_content_perf = false;
if (process.env.OFFLINE_SSR_TEST) {
    const testDataDir = process.env.OFFLINE_SSR_TEST_DATA_DIR || 'api_mockdata';
    let uri = `${__dirname}/../../`;
    get_state_perf = require(uri + testDataDir + '/get_state');
    get_content_perf = require(uri + testDataDir + '/get_content');
}

const calcOffsetRoot = startEl => {
    let offset = 0;
    let el = startEl;
    while (el) {
        offset += el.offsetTop;
        el = el.offsetParent;
    }
    return offset;
};

//BEGIN: SCROLL CODE
/**
 * The maximum number of times to attempt scrolling to the target element/y position
 * (total seconds of attempted scrolling is given by (SCROLL_TOP_TRIES * SCROLL_TOP_DELAY_MS)/1000 )
 * @type {number}
 */
const SCROLL_TOP_TRIES = 50;
/**
 * The number of milliseconds to delay between scroll attempts
 * (total seconds of attempted scrolling is given by (SCROLL_TOP_TRIES * SCROLL_TOP_DELAY_MS)/1000 )
 * @type {number}
 */
const SCROLL_TOP_DELAY_MS = 100;
/**
 * The size of the vertical gap between the bottom of the fixed header and the top of the scrolled-to element.
 * @type {number}
 */
const SCROLL_TOP_EXTRA_PIXEL_OFFSET = 3;
/**
 * number of pixels the document can move in the 'wrong' direction (opposite of intended scroll) this covers accidental scroll movements by users.
 * @type {number}
 */
const SCROLL_FUDGE_PIXELS = 10;
/**
 * if document is being scrolled up this is set for prevDocumentInfo && documentInfo
 * @type {string}
 */
const SCROLL_DIRECTION_UP = 'up';
/**
 * if document is being scrolled down this is set for prevDocumentInfo && documentInfo
 * @type {string}
 */
const SCROLL_DIRECTION_DOWN = 'down';

/**
 * If an element with this id is present, the page does not want us to detect navigation history direction (clicking links/forward button or back button)
 * @type {string}
 */
const DISABLE_ROUTER_HISTORY_NAV_DIRECTION_EL_ID =
    'disable_router_nav_history_direction_check';

let scrollTopTimeout = null;

/**
 * raison d'être: support hash link navigation into slow-to-render page sections.
 *
 * @param {htmlElement} el - the element to which we wish to scroll
 * @param {number} topOffset - number of pixels to add to the scroll. (would be a negative number if fixed header)
 * @param {Object} prevDocumentInfo -
 *          .scrollHeight {number} - document.body.scrollHeight
 *          .scrollTop {number} - ~document.scrollingElement.scrollTop
 *          .scrollTarget {number} - the previously calculated scroll target
 * @param {number} triesRemaining - number of attempts remaining
 */
const scrollTop = (el, topOffset, prevDocumentInfo, triesRemaining) => {
    const documentInfo = {
        scrollHeight: document.body.scrollHeight,
        scrollTop: Math.ceil(document.scrollingElement.scrollTop),
        scrollTarget: calcOffsetRoot(el) + topOffset,
        direction: prevDocumentInfo.direction,
    };
    let doScroll = false;
    //for both SCROLL_DIRECTION_DOWN, SCROLL_DIRECTION_UP
    //We scroll if the document has 1. not been deliberately scrolled, AND 2. we have not passed our target scroll,
    //NOR has the document changed in a meaningful way since we last looked at it
    if (prevDocumentInfo.direction === SCROLL_DIRECTION_DOWN) {
        doScroll =
            prevDocumentInfo.scrollTop <=
                documentInfo.scrollTop + SCROLL_FUDGE_PIXELS &&
            (documentInfo.scrollTop < documentInfo.scrollTarget ||
                prevDocumentInfo.scrollTarget < documentInfo.scrollTarget ||
                prevDocumentInfo.scrollHeight < documentInfo.scrollHeight);
    } else if (prevDocumentInfo.direction === SCROLL_DIRECTION_UP) {
        doScroll =
            prevDocumentInfo.scrollTop >=
                documentInfo.scrollTop - SCROLL_FUDGE_PIXELS &&
            (documentInfo.scrollTop > documentInfo.scrollTarget ||
                prevDocumentInfo.scrollTarget > documentInfo.scrollTarget ||
                prevDocumentInfo.scrollHeight > documentInfo.scrollHeight);
    }

    if (doScroll) {
        window.scrollTo(0, documentInfo.scrollTarget);
        if (triesRemaining > 0) {
            scrollTopTimeout = setTimeout(
                () =>
                    scrollTop(el, topOffset, documentInfo, triesRemaining - 1),
                SCROLL_TOP_DELAY_MS
            );
        }
    }
};

/**
 * Custom scrolling behavior needed because we have chunky page loads and a fixed header.
 */
class OffsetScrollBehavior extends ScrollBehavior {
    /**
     * Raison d'être: on hash link navigation, assemble the needed info and pass it to scrollTop()
     * In cases where we're scrolling to a pixel offset, adjust the offset for the current header, and punt to default behavior.
     */
    scrollToTarget(element, target) {
        clearTimeout(scrollTopTimeout); //it's likely this will be called multiple times in succession, so clear and existing scrolling.
        const header = document.getElementsByTagName('header')[0]; //this dimension ideally would be pulled from a scss file.
        let topOffset = SCROLL_TOP_EXTRA_PIXEL_OFFSET * -1;
        if (header) {
            topOffset += header.offsetHeight * -1;
        }
        const newTarget = []; //x coordinate
        let el = false;
        if (typeof target === 'string') {
            el = document.getElementById(target.substr(1));
            if (!el) {
                el = document.getElementById(target);
            }
        } else {
            newTarget.push(target[0]);
            if (target[1] + topOffset > 0) {
                newTarget.push(target[1] + topOffset);
            } else {
                newTarget.push(0);
            }
        }

        if (el) {
            const documentInfo = {
                scrollHeight: document.body.scrollHeight,
                scrollTop: Math.ceil(document.scrollingElement.scrollTop),
                scrollTarget: calcOffsetRoot(el) + topOffset,
            };
            documentInfo.direction =
                documentInfo.scrollTop < documentInfo.scrollTarget
                    ? SCROLL_DIRECTION_DOWN
                    : SCROLL_DIRECTION_UP;
            scrollTop(el, topOffset, documentInfo, SCROLL_TOP_TRIES); //this function does the actual work of scrolling.
        } else {
            super.scrollToTarget(element, newTarget);
        }
    }
}
//END: SCROLL CODE

const bindMiddleware = middleware => {
    if (process.env.BROWSER && process.env.NODE_ENV === 'development') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const runRouter = (location, routes) => {
    return new Promise(resolve =>
        match({ routes, location }, (...args) => resolve(args))
    );
};

const onRouterError = error => {
    console.error('onRouterError', error);
};

/**
 *
 * @param {*} location
 * @param {*} initialState
 * @param {*} ErrorPage
 * @param {*} userPreferences
 * @param {*} offchain
 * @param {RequestTimer} requestTimer
 * @returns promise
 */
export async function serverRender(
    location,
    initialState,
    ErrorPage,
    userPreferences,
    offchain,
    requestTimer
) {
    let error, redirect, renderProps;
    const hostConfig = initialState.app.hostConfig;
    const scotTokenSymbol = hostConfig['LIQUID_TOKEN_UPPERCASE'];
    const preferHive = hostConfig['PREFER_HIVE'];
    const APP_NAME = hostConfig['APP_NAME'];
    try {
        [error, redirect, renderProps] = await runRouter(location, RootRoute);
    } catch (e) {
        console.error('Routing error:', e.toString(), location);
        return {
            title: `Routing error - ${APP_NAME}`,
            statusCode: 500,
            body: renderToString(
                ErrorPage ? <ErrorPage /> : <span>Routing error</span>
            ),
        };
    }

    if (error || !renderProps) {
        console.error('Router error [404]', error, 'props?', !!renderProps);
        return {
            title: `Page Not Found - ${APP_NAME}`,
            statusCode: 404,
            body: serverRenderNotFound(hostConfig),
        };
    }

    let server_store, onchain;
    try {
        const url = location;

        requestTimer.startTimer('apiFetchState_ms');
        onchain = await apiFetchState(url, hostConfig);
        requestTimer.stopTimer('apiFetchState_ms');

        // If a user profile URL is requested but no profile information is
        // included in the API response, return User Not Found.
        if (
            url.match(routeRegex.UserProfile) &&
            Object.getOwnPropertyNames(onchain.profiles).length === 0
        ) {
            // protect for invalid account
            return {
                title: `User Not Found - ${APP_NAME}`,
                statusCode: 404,
                body: serverRenderNotFound(hostConfig),
            };
        }

        // If we are not loading a post, truncate state data to bring response size down.
        if (!url.match(routeRegex.Post)) {
            for (var key in onchain.content) {
                onchain.content[key]['active_votes'] = null;
            }
        }
        // Are we loading an un-category-aliased post?
        if (
            !url.match(routeRegex.UserProfile) &&
            !url.match(routeRegex.UserFeed) &&
            url.match(routeRegex.PostNoCategory)
        ) {
            let header;
            if (process.env.OFFLINE_SSR_TEST) {
                header = get_content_perf;
            } else {
                const postref = url.substr(2, url.length - 1).split('/');
                const params = { author: postref[0], permlink: postref[1] };
                if (!hostConfig['DISABLE_HIVE']) {
                    header = await callBridge('get_post_header', params, true);
                }
                if (!header) {
                    header = await callBridge('get_post_header', params, false);
                }
            }
            if (header && header.author && header.permlink && header.category) {
                const { author, permlink, category } = header;
                return { redirectUrl: `/${category}/@${author}/${permlink}` };
            } else {
                // protect on invalid user pages (i.e /user/transferss)
                return {
                    title: `Page Not Found - ${APP_NAME}`,
                    statusCode: 404,
                    body: serverRenderNotFound(hostConfig),
                };
            }
        }

        // Insert the pinned posts into the list of posts, so there is no
        // jumping of content.
        offchain.pinned_posts[scotTokenSymbol].pinned_posts.forEach(
            pinnedPost => {
                onchain.content[
                    `${pinnedPost.author}/${pinnedPost.permlink}`
                ] = pinnedPost;
            }
        );

        server_store = createStore(rootReducer, {
            app: initialState.app,
            global: onchain,
            userProfiles: { profiles: onchain['profiles'] },
            offchain,
        });
        server_store.dispatch({
            type: '@@router/LOCATION_CHANGE',
            payload: { pathname: location },
        });
        server_store.dispatch(appActions.setUserPreferences(userPreferences));
    } catch (e) {
        // Ensure 404 page when username not found
        if (location.match(routeRegex.UserProfile)) {
            console.error('User/not found: ', location, e);
            return {
                title: `Page Not Found - ${APP_NAME}`,
                statusCode: 404,
                body: serverRenderNotFound(hostConfig),
            };
            // Ensure error page on state exception
        } else {
            const msg = (e.toString && e.toString()) || e.message || e;
            const stack_trace = e.stack || '[no stack]';
            console.error('State/store error: ', msg, stack_trace);
            return {
                title: `Server error - ${APP_NAME}`,
                statusCode: 500,
                body: renderToString(<ErrorPage />),
            };
        }
    }

    let app, status, meta;
    try {
        requestTimer.startTimer('ssr_ms');
        app = renderToString(
            <Provider store={server_store}>
                <Translator>
                    <RouterContext {...renderProps} />
                </Translator>
            </Provider>
        );
        requestTimer.stopTimer('ssr_ms');
        meta = extractMeta(
            onchain,
            renderProps.params,
            initialState.app.hostConfig
        );
        status = 200;
    } catch (re) {
        console.error('Rendering error: ', re, re.stack);
        app = renderToString(<ErrorPage />);
        status = 500;
    }

    return {
        title: APP_NAME,
        titleBase: `${APP_NAME} - `,
        meta,
        statusCode: status,
        body: Iso.render(app, server_store.getState()),
    };
}

function serverRenderNotFound(hostConfig) {
    const server_store = createStore(rootReducer, {
        app: { hostConfig },
        global: {},
        userProfiles: {},
    });
    return renderToString(
        <Provider store={server_store}>
            <NotFound />
        </Provider>
    );
}

/**
 * dependencies:
 * browserHistory
 * useScroll
 * OffsetScrollBehavior
 * location
 *
 * @param {*} initialState
 */
export function clientRender(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    );
    sagaMiddleware.run(rootSaga);
    const history = syncHistoryWithStore(browserHistory, store);

    /**
     * When to scroll - on hash link navigation determine if the page should scroll to that element (forward nav, or ignore nav direction)
     */
    const scroll = useScroll({
        createScrollBehavior: config => new OffsetScrollBehavior(config), //information assembler for has scrolling.
        shouldUpdateScroll: (prevLocation, { location }) => {
            // eslint-disable-line no-shadow
            //if there is a hash, we may want to scroll to it
            if (location.hash) {
                //if disableNavDirectionCheck exists, we want to always navigate to the hash (the page is telling us that's desired behavior based on the element's existence
                const disableNavDirectionCheck = document.getElementById(
                    DISABLE_ROUTER_HISTORY_NAV_DIRECTION_EL_ID
                );
                //we want to navigate to the corresponding id=<hash> element on 'PUSH' navigation (prev null + POP is a new window url nav ~= 'PUSH')
                if (
                    disableNavDirectionCheck ||
                    (prevLocation === null && location.action === 'POP') ||
                    location.action === 'PUSH'
                ) {
                    return location.hash;
                }
            }
            return true;
        },
    });

    if (process.env.NODE_ENV === 'production') {
        console.log(
            '%c%s',
            'color: red; background: yellow; font-size: 24px;',
            'WARNING!'
        );
        console.log(
            '%c%s',
            'color: black; font-size: 16px;',
            'This is a developer console, you must read and understand anything you paste or type here or you could compromise your account and your private keys.'
        );
    }

    return render(
        <Provider store={store}>
            <Translator>
                <Router
                    routes={RootRoute}
                    history={history}
                    onError={onRouterError}
                    render={applyRouterMiddleware(scroll)}
                />
            </Translator>
        </Provider>,
        document.getElementById('content')
    );
}

async function apiFetchState(url, hostConfig) {
    let onchain;

    if (process.env.OFFLINE_SSR_TEST) {
        onchain = get_state_perf;
    }

    onchain = await getStateAsync(url, hostConfig, null, true);

    return onchain;
}
