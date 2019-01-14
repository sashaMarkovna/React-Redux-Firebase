import React from 'react';
import { Redirect} from 'react-router-dom';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Spinner from "../general/Spinner";
import UserSummary from "./UserSummary";

const UsersList = ({ users, auth }) => {

    if (!auth.uid) return <Redirect to='/signin'/>;

    return (
        <div className="container">
            <div className="users-list row">
                { isLoaded(users) && users.length
                    ? users.map(user => {
                        return (
                            <UserSummary user={ user } key={ user.id }/>
                        )})
                    : <Spinner/> }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(UsersList);