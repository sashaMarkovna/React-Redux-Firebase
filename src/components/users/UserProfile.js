import React, { Component } from 'react';
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import ProjectList from "../projects/ProjectList";
import Notifications from "../dashboard/Notifications";
import UserBanner from "./UserBanner";
import UserNavbar from "./UserNavbar";

class UserProfile extends Component {
    render() {
        const { projects, notifications, auth, users } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;
        const user = users && users[0];
        const id = this.props.match.params.id;
        const userProjects = projects && projects.filter((project) => project['authorId'] === id);

        return (
            <div className="container">
                { user ? <UserBanner user={ user }/> : null }
                { auth.uid === id ? <UserNavbar/> : null }
                <div className="row">
                    <div className="col s12 m6">
                        { userProjects ? <ProjectList projects={ userProjects }/> : null }
                    </div>
                    { auth.uid === id ? <div className="col s12 m5 offset-m1"><Notifications notifications={ notifications }/></div> : null }
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
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {collection: 'projects', orderBy: ['createdAt', 'desc']},
            {collection: 'notifications', limit: 3, orderBy: ['time', 'desc']},
            {collection: 'users', doc: props.match.params.id}
        ]
    })
)(UserProfile);