/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as userActions from 'app/redux/UserReducer';
import * as transactionActions from 'app/redux/TransactionReducer';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import { actions as userProfileActions } from 'app/redux/UserProfilesSaga';
import UserWallet from 'app/components/modules/UserWallet';
import Settings from 'app/components/modules/Settings';
import UserList from 'app/components/elements/UserList';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import NotificationsList from 'app/components/cards/NotificationsList';
import PostsList from 'app/components/cards/PostsList';
import { isFetchingOrRecentlyUpdated } from 'app/utils/StateFunctions';
import tt from 'counterpart';
import Callout from 'app/components/elements/Callout';
import userIllegalContent from 'app/utils/userIllegalContent';
import UserProfileHeader from 'app/components/cards/UserProfileHeader';
import SubscriptionsList from '../cards/SubscriptionsList';
import { PREFER_HIVE } from 'app/client_config';

const emptyPostsText = (section, account, isMyAccount) => {
    const name = '@' + account;

    if (section == 'posts') {
        return tt('user_profile.user_hasnt_made_any_posts_yet', { name });
    } else if (section == 'comments') {
        return tt('user_profile.user_hasnt_made_any_posts_yet', { name });
    } else if (section == 'replies') {
        return (
            tt('user_profile.user_hasnt_had_any_replies_yet', { name }) + '.'
        );
    } else if (section == 'payout') {
        return 'No pending payouts.';
    } else if (section == 'blog' && !isMyAccount) {
        return tt('user_profile.user_hasnt_started_bloggin_yet', { name });
    } else if (section == 'blog') {
        return (
            <div>
                {tt('user_profile.looks_like_you_havent_posted_anything_yet')}
                <br />
                <br />
                <br />
                <Link to="/submit.html">
                    {tt('user_profile.create_a_post')}
                </Link>
                <br />
                <Link to="/trending">Trending Articles</Link>
                <br />
                {/*
                TODO: introduceyourself nudge, FUUX
                tt('user_profile.read_the_quick_start_guide')
                tt('user_profile.explore_trending_articles')
                <Link to="/faq.html">
                    {tt('user_profile.browse_the_faq')}
                </Link>
                <br />*/}
            </div>
        );
    } else {
        console.error('unhandled emptytext case', section, name, isMyAccount);
    }
};

export default class UserProfile extends React.Component {
    constructor() {
        super();
        this.loadMore = this.loadMore.bind(this);
    }

    componentWillMount() {
        const { profile, accountname, fetchProfile, username } = this.props;
        if (!profile) fetchProfile(accountname, username);
    }

    componentDidUpdate(prevProps) {
        const { profile, accountname, fetchProfile, username } = this.props;
        if (
            prevProps.accountname != accountname ||
            prevProps.username != username
        ) {
            if (!profile) fetchProfile(accountname, username);
        }
    }

    shouldComponentUpdate(np, ns) {
        return (
            np.username !== this.props.username ||
            np.status !== this.props.status ||
            np.followers !== this.props.followers ||
            np.following !== this.props.following ||
            np.loading !== this.props.loading ||
            np.location.pathname !== this.props.location.pathname ||
            np.blogmode !== this.props.blogmode ||
            np.posts !== this.props.posts ||
            np.profile !== this.props.profile ||
            np.notifications !== this.props.notifications
        );
    }

    loadMore() {
        const last_post = this.props.posts ? this.props.posts.last() : null;
        if (!last_post) return;
        //if (last_post == this.props.pending) return; // if last post is 'pending', its an invalid start token
        const { username, status, order, category } = this.props;

        if (isFetchingOrRecentlyUpdated(status, order, category)) return;

        const [author, permlink] = last_post.split('/');
        this.props.requestData({
            author,
            permlink,
            order,
            category,
            observer: username,
            useHive: this.props.preferHive,
        });
    }

    render() {
        const {
            props: {
                username,
                status,
                following,
                followers,
                accountname,
                walletUrl,
                category,
                section,
                order,
                posts,
                profile,
                notifications,
                subscriptions,
            },
        } = this;

        // Loading status
        const _state = status ? status.getIn([category, order]) : null;
        const fetching = (_state && _state.fetching) || this.props.loading;

        if (
            !profile &&
            (fetching ||
                (this.props.section === 'notifications' &&
                    !this.props.notifications))
        ) {
            return (
                <center>
                    <LoadingIndicator type="circle" />
                </center>
            );
        } else if (!profile) {
            return (
                <div>
                    <center>{tt('user_profile.unknown_account')}</center>
                </div>
            );
        }

        const isMyAccount = username === accountname;

        let tab_content = null;

        let walletClass = '';
        if (section === 'transfers') {
            walletClass = 'active';
            tab_content = (
                <div>
                    <UserWallet
                        profile={profile}
                        accountname={accountname}
                        current_user={username}
                        showTransfer={this.props.showTransfer}
                        showPowerdown={this.props.showPowerdown}
                        cancelUnstake={this.props.cancelUnstake}
                        showDelegations={this.props.showDelegations}
                    />
                </div>
            );
        } else if (userIllegalContent.includes(accountname)) {
            // invalid users
            tab_content = <div>Unavailable For Legal Reasons.</div>;
        } else if (section === 'followers') {
            // users following this user
            tab_content = <UserList title="Followers" users={followers} />;
        } else if (section === 'followed') {
            // users followed by this user
            tab_content = <UserList title="Followed" users={following} />;
        } else if (section === 'notifications') {
            // notifications
            tab_content = (
                <NotificationsList
                    username={accountname}
                    notifications={notifications && notifications.toJS()}
                />
            );
        } else if (section === 'communities') {
            tab_content = (
                <SubscriptionsList
                    username={accountname}
                    subscriptions={subscriptions}
                />
            );
        } else if (section === 'settings') {
            // account display settings
            tab_content = <Settings routeParams={this.props.routeParams} />;
        } else if (!posts) {
            // post lists -- not loaded
            tab_content = (
                <center>
                    <LoadingIndicator type="circle" />
                </center>
            );
        } else if (!fetching && !posts.size) {
            // post lists -- empty
            const emptyText = emptyPostsText(section, accountname, isMyAccount);
            tab_content = <Callout>{emptyText}</Callout>;
        } else {
            // post lists -- loaded
            tab_content = (
                <PostsList
                    post_refs={posts}
                    loading={fetching}
                    loadMore={this.loadMore}
                />
            );
        }

        const _url = tab => `/@${accountname}${tab == 'blog' ? '' : '/' + tab}`;

        const _tablink2 = (tab, label) => {
            const item =
                tab == section ? (
                    <strong>{label}</strong>
                ) : (
                    <Link to={_url(tab)}>{label}</Link>
                );
            return <div key={tab}>{item}</div>;
        };

        let tab_header;
        let top_active = section;
        if (['posts', 'comments'].includes(section)) {
            top_active = 'posts';
            tab_header = (
                <div className="UserProfile__postmenu">
                    {_tablink2('posts', tt('g.posts'))}
                    {_tablink2('comments', tt('g.comments'))}
                </div>
            );
        }

        const _tablink = (tab, label) => {
            const cls = tab === top_active ? 'active' : null;
            return (
                <Link to={_url(tab)} className={cls}>
                    {label}
                </Link>
            );
        };

        const top_menu = (
            <div className="row UserProfile__top-menu">
                <div className="columns small-9 medium-12 medium-expand">
                    <ul className="menu" style={{ flexWrap: 'wrap' }}>
                        <li>{_tablink('blog', tt('g.blog'))}</li>
                        <li>{_tablink('posts', tt('g.posts'))}</li>
                        <li>{_tablink('replies', tt('g.replies'))}</li>
                        <li>
                            <Link
                                to={`/@${accountname}/transfers`}
                                activeClassName="acive"
                            >
                                {tt('g.wallet')}
                            </Link>
                        </li>
                        {isMyAccount && (
                            <li>{_tablink('settings', tt('g.settings'))}</li>
                        )}
                    </ul>
                </div>
            </div>
        );

        return (
            <div className="UserProfile">
                <UserProfileHeader
                    current_user={username}
                    accountname={accountname}
                    profile={profile}
                />
                <div className="UserProfile__top-nav row expanded">
                    {top_menu}
                </div>
                <div className="row">
                    <div
                        className={classnames(
                            'UserProfile__tab_content',
                            'column',
                            'layout-list'
                        )}
                    >
                        <article className="articles">
                            {tab_header}
                            {tab_content}
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: '@:accountname(/:section)',
    component: connect(
        (state, ownProps) => {
            const username = state.user.getIn(['current', 'username']);
            const accountname = ownProps.routeParams.accountname.toLowerCase();
            const walletUrl = state.app.get('walletUrl');
            const preferHive = state.app.getIn(['hostConfig', 'PREFER_HIVE']);

            let { section } = ownProps.routeParams;
            if (!section) section = 'blog';
            const order = [
                'blog',
                'posts',
                'comments',
                'replies',
                'payout',
            ].includes(section)
                ? section
                : null;

            return {
                posts: state.global.getIn([
                    'discussion_idx',
                    '@' + accountname,
                    order,
                ]),
                username,
                loading: state.app.get('loading'),
                status: state.global.get('status'),
                accountname,
                followers: state.global.getIn([
                    'follow',
                    'getFollowersAsync',
                    accountname,
                    'blog_result',
                ]),
                following: state.global.getIn([
                    'follow',
                    'getFollowingAsync',
                    accountname,
                    'blog_result',
                ]),
                notifications: state.global.getIn(
                    ['notifications', accountname, 'notifications'],
                    null
                ),
                blogmode: state.app.getIn(['user_preferences', 'blogmode']),
                profile: state.userProfiles.getIn(['profiles', accountname]),
                walletUrl: walletUrl + '/@' + accountname + '/transfers',
                preferHive,
                section,
                order,
                category: '@' + accountname,
                subscriptions: state.global.getIn([
                    'subscriptions',
                    accountname,
                ])
                    ? state.global.getIn(['subscriptions', accountname]).toJS()
                    : [],
            };
        },
        dispatch => ({
            login: () => {
                dispatch(userActions.showLogin());
            },
            clearTransferDefaults: () => {
                dispatch(userActions.clearTransferDefaults());
            },
            showTransfer: transferDefaults => {
                dispatch(userActions.setTransferDefaults(transferDefaults));
                dispatch(userActions.showTransfer());
            },
            clearPowerdownDefaults: () => {
                dispatch(userActions.clearPowerdownDefaults());
            },
            showPowerdown: powerdownDefaults => {
                console.log('power down defaults:', powerdownDefaults);
                dispatch(userActions.setPowerdownDefaults(powerdownDefaults));
                dispatch(userActions.showPowerdown());
            },
            cancelUnstake: ({ account, tokenUnstakes, useHive }) => {
                const cancelUnstakeOps = tokenUnstakes.map(tokenUnstake => ({
                    contractName: 'tokens',
                    contractAction: 'cancelUnstake',
                    contractPayload: {
                        txID: tokenUnstake.txID,
                    },
                }));
                const operation = {
                    id: useHive ? 'ssc-mainnet-hive' : 'ssc-mainnet1',
                    required_auths: [account],
                    json: JSON.stringify(cancelUnstakeOps),
                };
                const successCallback = () => {
                    dispatch(
                        userProfileActions.fetchWalletProfile({ account })
                    );
                };
                dispatch(
                    transactionActions.broadcastOperation({
                        type: 'custom_json',
                        operation,
                        successCallback,
                        confirm: tt('g.are_you_sure'),
                        useHive,
                    })
                );
            },
            requestData: args =>
                dispatch(fetchDataSagaActions.requestData(args)),
            showDelegations: delegations => {
                dispatch(userActions.setDelegations(delegations));
                dispatch(userActions.showDelegations());
            },
            fetchProfile: (account, observer) =>
                dispatch(
                    userProfileActions.fetchProfile({ account, observer })
                ),
        })
    )(UserProfile),
};
