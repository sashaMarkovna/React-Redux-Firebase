import React from 'react';
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import moment from "moment";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import { firestoreConnect } from "react-redux-firebase";

const UserSignature = (props) => {

    const { user } = props;
    const { time, userId, componentClass } = props.authorProps;

    return (
        <div className={`user-signature user-signature--${ componentClass }`}>
            <div className="user-signature__avatar">
                 <Link to={`/user/${ userId }`}>
                     <UserAvatar componentClass={ componentClass } userAvatarUrl={ user && user.avatar }/>
                 </Link>
            </div>
            <div style={{ lineHeight: '20px' }}>
                <div className={`user-signature__name user-signature__name--${ componentClass }`}>
                    <Link className="user-link" to={`/user/${ userId }`}>{ user ? `${ user.firstName } ${ user.lastName }` : null }</Link>
                </div>
                {
                    time ? (
                        <div className={`grey-text user-signature__timestamp user-signature__timestamp--${ componentClass }`}>
                            { moment(time.toDate()).calendar() }
                        </div> )
                    : null
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
    const users = state.firestore.data.users;
    const user = users && users[ownProps.authorProps.userId];
    return { user }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => {
        return [{ collection: 'users' }];
    }))(UserSignature);