import React from 'react';
import UserPhoto from "../general/UserPhoto";
import { connect } from 'react-redux';
import EditLink from "../general/EditLink";

const UserBanner = (props) => {

    const { user, auth } = props;
    const editBannerLink = {
        linkTo: `/user/${ user.id }/editMyProfileBanner`,
        elemClass: 'edit-photo-link',
        positionalLinkClass: 'edit-link-profile-banner'
    };

    const editPhotolink = {
        linkTo: `/user/${ user.id }/editMyProfilePhoto`,
        elemClass: 'edit-photo-link',
        positionalLinkClass: 'edit-link-profile-photo'
    };

    const changeBanner = auth.uid === user.id ? <EditLink linkParams={ editBannerLink }/>: null;

    const banner = {
        backgroundImage: `url(${ user.profileBanner })`,
        height: '30vh'
    };

    return (
        <div className="user-banner" style={ banner }>
            { changeBanner }
            <div className="user-name">
                <h4 className="user-profile-name">{ `${ user.firstName } ${ user.lastName }` }</h4>
            </div>
            <UserPhoto
                pictureUrl={ user.userPhoto }
                rootComponent={'profile-page-img'}
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