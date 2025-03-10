import { fromJS, Map } from 'immutable';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import tt from 'counterpart';
import { api as steemApi } from '@steemit/steem-js';
import { api as hiveApi } from '@hiveio/hive-js';
import * as globalActions from './GlobalReducer';
import * as appActions from './AppReducer';
import * as transactionActions from './TransactionReducer';
import { setUserPreferences } from 'app/utils/ServerApiClient';
import { getContentAsync, getStateAsync } from 'app/utils/steemApi';

const wait = ms =>
    new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });

export const sharedWatches = [
    takeLatest(
        [
            appActions.SET_USER_PREFERENCES,
            appActions.TOGGLE_NIGHTMODE,
            appActions.TOGGLE_BLOGMODE,
        ],
        saveUserPreferences
    ),
    takeEvery('transaction/ERROR', showTransactionErrorNotification),
];

export function* getAccount(username, useHive, force = false) {
    let account = yield select(state =>
        state.global.get('accounts').get(username)
    );

    // hive never serves `owner` prop (among others)
    let isLite = !!account && !account.get('owner');

    if (!account || force || isLite) {
        console.log(
            'getAccount: loading',
            username,
            'force?',
            force,
            'lite?',
            isLite
        );

        const api = useHive ? hiveApi : steemApi;
        [account] = yield call([api, api.getAccountsAsync], [username]);
        const accountWitness = yield call(
            [api, api.callAsync],
            'condenser_api.get_witness_by_account',
            [username]
        );

        if (account) {
            if (accountWitness) {
                account.account_is_witness = true;
            }

            account = fromJS(account);
            yield put(globalActions.receiveAccount({ account }));
        }
    }
    return account;
}

function* showTransactionErrorNotification() {
    const errors = yield select(state => state.transaction.get('errors'));
    for (const [key, message] of errors) {
        // Do not display a notification for the bandwidthError key.
        if (key !== 'bandwidthError') {
            yield put(appActions.addNotification({ key, message }));
            yield put(transactionActions.deleteError({ key }));
        }
    }
}

export function* getContent({ author, permlink, resolve, reject }) {
    const scotTokenSymbol = yield select(state =>
        state.app.getIn(['hostConfig', 'LIQUID_TOKEN_UPPERCASE'])
    );
    const preferHive = yield select(state =>
        state.app.getIn(['hostConfig', 'PREFER_HIVE'])
    );
    let content;
    let attempt = 1;
    while (!content && attempt <= 5) {
        console.log('getContent', author, permlink);
        content = yield call(
            getContentAsync,
            author,
            permlink,
            scotTokenSymbol,
            preferHive
        );
        if (content['author'] == '') {
            // retry if content not found. #1870
            attempt += 1;
            content = null;
            yield call(wait, 3000);
        }
    }

    function dbg(content) {
        const cop = Object.assign({}, content);
        delete cop['active_votes'];
        return JSON.stringify(cop);
    }

    yield put(globalActions.receiveContent({ content }));
    if (resolve && content) {
        resolve(content);
    } else if (reject && !content) {
        reject();
    }
}

/**
 * Save this user's preferences, either directly from the submitted payload or from whatever's saved in the store currently.
 *
 * @param {Object?} params.payload
 */
function* saveUserPreferences({ payload }) {
    if (payload) {
        yield setUserPreferences(payload);
    }

    const prefs = yield select(state => state.app.get('user_preferences'));
    yield setUserPreferences(prefs.toJS());
}
