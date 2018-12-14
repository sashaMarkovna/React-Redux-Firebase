import React from 'react';
import connect from "react-redux/es/connect/connect";
import EditLink from "./EditLink";

const UserPhoto = (props) => {
    const { pictureUrl, rootComponent, auth, userId, linkParams } = props;
    const picture = pictureUrl ? (<img src={ pictureUrl } className="user-img"></img>) : null;
    const changePhoto = auth.uid === userId ? <EditLink linkParams={ linkParams }/>: null;

    return (
        <div className="user-photo-block">
            <div className={ rootComponent }>
                { picture }
                { changePhoto }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.firebase.auth }
};

export default connect(mapStateToProps)(UserPhoto);