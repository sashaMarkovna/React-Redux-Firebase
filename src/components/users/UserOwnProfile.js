import React, { Component } from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {firestoreConnect} from "react-redux-firebase";
import {Redirect} from "react-router-dom";
import ProjectList from "../projects/ProjectList";
import Notifications from "../dashboard/Notifications";
import UserBanner from "./UserBanner";

class UserOwnProfile extends Component {
    render() {
        const { projects, notifications, auth, users } = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>;

        const id = this.props.match.params.id;
        const userProjects = id ? projects && projects.filter((project) => project['authorId'] === id ) : null;
        const projectContent = userProjects ?  <ProjectList projects={ userProjects }/> : null;
        const currentUser = users && users.filter((user) => user['id'] === id)[0];
        const userBanner = currentUser ? <UserBanner user={ currentUser }/> : null;

        return (
            <div className="container">
                { userBanner }
                <div className="row">
                    <div className="col s12 m6">
                        { projectContent }
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={ notifications }/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        notifications: state.firestore.ordered.notifications,
        users: state.firestore.ordered.users,
        auth: state.firebase.auth

    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
        { collection: 'users'}
    ])
)(UserOwnProfile);