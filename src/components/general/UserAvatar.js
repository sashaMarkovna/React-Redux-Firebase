import React from 'react';

const UserAvatar = (props) => {
    const { userPhotoUrl, componentClass } = props.avatarProps;
    return (
        <div className={ `user-photo user-photo--${ componentClass }` }>
            { userPhotoUrl ? (<img src={ userPhotoUrl } className="responsive-img" alt=""/>) : null }
        </div>
    );
};

export default UserAvatar;