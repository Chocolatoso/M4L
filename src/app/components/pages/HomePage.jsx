/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import tt from 'counterpart';
import { List, Map, OrderedMap } from 'immutable';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';
import PostsList from 'app/components/cards/PostsList';
import { isFetchingOrRecentlyUpdated } from 'app/utils/StateFunctions';
import Callout from 'app/components/elements/Callout';
import SidebarLinks from 'app/components/elements/SidebarLinks';
import { GptUtils } from 'app/utils/GptUtils';
import GptAd from 'app/components/elements/GptAd';
import Topics from './Topics';
import SortOrder from 'app/components/elements/SortOrder';
import { PROMOTED_POST_PAD_SIZE } from 'shared/constants';
import tagHeaderMap from 'app/utils/TagFeedHeaderMap';
import MarkdownViewer from 'app/components/cards/MarkdownViewer';
import { ifHivemind } from 'app/utils/Community';
import PostsIndexLayout from 'app/components/pages/PostsIndexLayout';

// posts_index.empty_feed_1 [-5]
const noFriendsText = (
    <div>
        NO ESTAS SIGUIEND OA NADIE<br />
        <br />
        <span style={{ fontSize: '1.1rem' }}>
            <Link to="/">Explore Trending</Link>
        </span>
        <br />
    </div>
);

const noCommunitiesText = (
    <div>
        You haven't joined any active communities yet!<br />
        <br />
        <span style={{ fontSize: '1.1rem' }}>
            <Link to="/communities">Explore Communities</Link>
        </span>
        {/*
        <br /><br />
        <Link to="/welcome">New users guide</Link>*/}
    </div>
);

class HomePage extends React.Component {
    static propTypes = {
        posts: PropTypes.object,
        status: PropTypes.object,
        routeParams: PropTypes.object,
        requestData: PropTypes.func,
        loading: PropTypes.bool,
        username: PropTypes.string,
        blogmode: PropTypes.bool,
        interleavePromoted: PropTypes.bool,
        topics: PropTypes.object,
    };

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div className="newUiHome" />;
    }
}

module.exports = {
    path: ':order(/:category)',
    component: connect(
        (state, ownProps) => {
            const hostConfig = state.app.get('hostConfig', Map());
            const preferHive = hostConfig.get('PREFER_HIVE');
            // route can be e.g. trending/food (order/category);
            //   or, @username/feed (category/order). Branch on presence of `@`.
            const route = ownProps.routeParams;
            const account_name =
                route.order && route.order[0] == '@'
                    ? route.order.slice(1).toLowerCase()
                    : null;
            const category = account_name
                ? route.order
                : route.category ? route.category.toLowerCase() : null;
            const order = account_name
                ? route.category
                : route.order || 'trending';

            const hive = ifHivemind(category);
            const community = state.global.getIn(['community', hive], null);

            const enableAds =
                ownProps.gptEnabled &&
                !GptUtils.HasBannedTags(
                    [category],
                    state.app.getIn(['googleAds', 'gptBannedTags'])
                );

            const key = ['discussion_idx', category || '', order];
            let posts = state.global.getIn(key, List());
            const promotedKey = ['discussion_idx', category || '', 'promoted'];
            const promotedPosts = state.global.getIn(promotedKey, List());

            // if 'pending' post is found, prepend it to posts list
            //   (see GlobalReducer RECEIVE_CONTENT)
            const pkey = ['discussion_idx', category || '', '_' + order];
            const pending = state.global.getIn(pkey, null);
            if (pending && !posts.includes(pending)) {
                posts = posts.unshift(pending);
            }
            const username =
                state.user.getIn(['current', 'username']) ||
                state.offchain.get('account');

            return {
                subscriptions: state.global.getIn(['subscriptions', username]),
                status: state.global.get('status'),
                loading: state.app.get('loading'),
                account_name,
                category,
                order,
                posts,
                promotedPosts,
                pending,
                community,
                username,
                blogmode: state.app.getIn(['user_preferences', 'blogmode']),
                topics: state.global.getIn(['topics'], List()),
                categories: state.global.get('categories'),
                pinned: state.offchain.get('pinned_posts'),
                isBrowser: process.env.BROWSER,
                gptEnabled: state.app.getIn(['googleAds', 'gptEnabled']),
                interleavePromoted: hostConfig.get(
                    'INTERLEAVE_PROMOTED',
                    false
                ),
                preferHive,
                enableAds,
            };
        },
        dispatch => ({
            getSubscriptions: account =>
                dispatch(fetchDataSagaActions.getSubscriptions(account)),
            requestData: args =>
                dispatch(fetchDataSagaActions.requestData(args)),
            getCommunity: category =>
                dispatch(fetchDataSagaActions.getCommunity(category)),
            getCategories: () => dispatch(fetchDataSagaActions.getCategories()),
        })
    )(HomePage),
};
