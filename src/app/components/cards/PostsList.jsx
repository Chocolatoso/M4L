import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import debounce from 'lodash.debounce';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import PostSummary from 'app/components/cards/PostSummary';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import GptAd from 'app/components/elements/GptAd';
import ReviveAd from 'app/components/elements/ReviveAd';
import VideoAd from 'app/components/elements/VideoAd';
import GoogleAd from 'app/components/elements/GoogleAd';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';

function topPosition(domElt) {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}

class PostsList extends React.Component {
    static propTypes = {
        posts: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        category: PropTypes.string,
        loadMore: PropTypes.func,
        nsfwPref: PropTypes.string.isRequired,
        promoted: PropTypes.object,
        interleavePromoted: PropTypes.bool,
    };

    static defaultProps = {
        loading: false,
    };

    constructor() {
        super();
        this.state = {
            thumbSize: 'desktop',
            showNegativeComments: false,
        };
        this.scrollListener = this.scrollListener.bind(this);
        this.onBackButton = this.onBackButton.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PostsList');
    }

    componentDidMount() {
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
        window.removeEventListener('popstate', this.onBackButton);
        window.removeEventListener('keydown', this.onBackButton);
    }

    onBackButton(e) {
        if ('keyCode' in e && e.keyCode !== 27) return;
        window.removeEventListener('popstate', this.onBackButton);
        window.removeEventListener('keydown', this.onBackButton);
    }

    fetchIfNeeded() {
        this.scrollListener();
    }

    scrollListener = debounce(() => {
        const el = window.document.getElementById('posts_list');
        if (!el) return;
        const scrollTop =
            window.pageYOffset !== undefined
                ? window.pageYOffset
                : (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                  ).scrollTop;
        if (
            topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight <
            10
        ) {
            const { loadMore, posts } = this.props;
            if (loadMore && posts.size > 0) loadMore();
        }

        // Detect if we're in mobile mode (renders larger preview imgs)
        const mq = window.matchMedia('screen and (max-width: 39.9375em)');
        if (mq.matches) {
            this.setState({ thumbSize: 'mobile' });
        } else {
            this.setState({ thumbSize: 'desktop' });
        }
    }, 150);

    attachScrollListener() {
        window.addEventListener('scroll', this.scrollListener, {
            capture: false,
            passive: true,
        });
        window.addEventListener('resize', this.scrollListener, {
            capture: false,
            passive: true,
        });
        this.scrollListener();
    }

    detachScrollListener() {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
    }

    render() {
        const {
            posts,
            promoted,
            loading,
            category,
            order,
            nsfwPref,
            hideCategory,
            interleavePromoted,
        } = this.props;
        const { thumbSize } = this.state;
        const renderSummary = items =>
            items.map((post, i) => {
                const ps = (
                    <PostSummary
                        post={post}
                        thumbSize={thumbSize}
                        nsfwPref={nsfwPref}
                        promoted={promoted}
                        hideCategory={hideCategory}
                        order={order}
                    />
                );

                const summary = [];
                const isPromoted =
                    interleavePromoted &&
                    promoted &&
                    promoted.contains(
                        `${post.get('author')}/${post.get('permlink')}`
                    );
                summary.push(
                    <li key={i} className={isPromoted ? 'liPromoted' : ''}>
                        {ps}
                    </li>
                );

                return summary;
            });

        return (
            <div id="posts_list" className="PostsList">
                <ul
                    className="PostsList__summaries hfeed"
                    itemScope
                    itemType="http://schema.org/blogPosts"
                >
                    {renderSummary(posts)}
                </ul>
                {loading && (
                    <center>
                        <LoadingIndicator
                            style={{ marginBottom: '2rem' }}
                            type="circle"
                        />
                    </center>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const userPreferences = state.app.get('user_preferences').toJS();
        const nsfwPref = userPreferences.nsfwPref || 'warn';
        const shouldSeeAds = state.app.get('reviveEnabled');
        const adSlots = state.app.getIn(['googleAds', 'adSlots']).toJS();

        const current = state.user.get('current');
        const username = current
            ? current.get('username')
            : state.offchain.get('account');
        const mutes = state.global.getIn(
            ['follow', 'getFollowingAsync', username, 'ignore_result'],
            List()
        );

        let { posts } = props;
        if (typeof posts === 'undefined') {
            const { post_refs, loading } = props;
            if (post_refs) {
                posts = [];
                props.post_refs.forEach(ref => {
                    const post = state.global.getIn(['content', ref]);
                    if (!post) {
                        // can occur when deleting a post
                        console.error('PostsList --> Missing cont key: ' + ref);
                        return;
                    }
                    const muted = mutes.has(post.get('author'));
                    if (!muted) posts.push(post);
                });
                posts = List(posts);
            } else {
                console.error('PostsList: no `posts` or `post_refs`');
            }
        }

        return {
            ...props, //loading,category,order,hideCategory
            posts,
            nsfwPref,
            shouldSeeAds,
            adSlots,
            interleavePromoted: state.app.getIn(
                ['hostConfig', 'INTERLEAVE_PROMOTED'],
                false
            ),
        };
    },
    dispatch => ({
        fetchState: pathname => {
            dispatch(fetchDataSagaActions.fetchState({ pathname }));
        },
    })
)(PostsList);
