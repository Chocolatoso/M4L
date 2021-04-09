import React from 'react';
import { Link } from 'react-router';

const Tag = ({ post, community }) => {
    const crossPostedBy = post.get('cross_posted_by');
    let tag = post.get('category');
    let name = post.get(
        'community_title',
        community ? community.get('title') : '#' + tag
    );

    if (crossPostedBy) {
        tag = post.get('cross_post_category');
        name = post.get('cross_post_community_title', '#' + tag);
    }

    return (
        <Link
            to={`/trending/${tag}`}
            key={tag}
            style={{
                background: '#229AC4 0% 0% no-repeat padding-box',
                padding: '5px',
                borderRadius: '6px',
                color: 'white',
                fontWeight: 'normal',
                fontSize: '13px',
            }}
        >
            {name}
        </Link>
    );
};

export default Tag;
