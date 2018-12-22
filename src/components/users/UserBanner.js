import React from 'react';
import UserPhoto from "../general/UserPhoto";
import { connect } from 'react-redux';
import EditLink from "../general/EditLink";

const UserBanner = (props) => {

    const { user, auth } = props;
    const editBannerLink = {
        linkTo: `/user/${ user.id }/edit-file/editMyProfileBanner`,
        elemClass: 'edit-link__img',
        positionalLinkClass: 'banner'
    };

    const editPhotolink = {
        linkTo: `/user/${ user.id }/edit-file/editMyProfilePhoto`,
        elemClass: 'edit-link__img',
        positionalLinkClass: 'user-photo'
    };

    return (
        <div className="user-banner" style={{ backgroundImage: `url(${ user.profileBanner })`}}>
            { auth.uid === user.id ? <EditLink linkParams={ editBannerLink }/>: null }
            <div className="user-banner__name-block">
                <h4 className="user-banner__name">{ `${ user.firstName } ${ user.lastName }` }</h4>
            </div>
            <UserPhoto
                pictureUrl={ user.userPhoto }
                rootComponent={'--profile'}
                userId={ user.id }
                linkParams={ editPhotolink }
            />
        </div>
    )
};

const mapStateToProps = (state) => {
    return { auth: state.firebase.auth }
};

export default connect(mapStateToProps)(UserBanner);