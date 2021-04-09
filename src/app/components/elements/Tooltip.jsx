import React from 'react';

export default ({ children, className, t }) => {
    return (
        <span style={{ color: '#464C5E' }} title={t} className={className}>
            {children}
        </span>
    );
};
