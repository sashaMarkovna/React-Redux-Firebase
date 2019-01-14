import React from 'react';

const UserAvatar = ({ userAvatarUrl, componentClass }) => {
    return (
        <div className={ `user-avatar user-avatar--${ componentClass }` }>
            { userAvatarUrl ? (<img src={ userAvatarUrl } className="responsive-img" alt=""/>) : null }
        </div>
    );
};

export default UserAvatar;