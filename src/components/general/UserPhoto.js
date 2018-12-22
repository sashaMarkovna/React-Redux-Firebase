import React from 'react';
import connect from "react-redux/es/connect/connect";
import EditLink from "./EditLink";

const UserPhoto = (props) => {
    const { pictureUrl, rootComponent, auth, userId, linkParams } = props;

    return (
        <div className="user-photo">
            { auth.uid === userId ? <EditLink linkParams={ linkParams }/>: null }
            <div className={ `user-photo__image-block user-photo__image-block${ rootComponent }` }>
                { pictureUrl ? (<img src={ pictureUrl } className="user-photo__img" alt=""></img>) : null }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.firebase.auth }
};

export default connect(mapStateToProps)(UserPhoto);