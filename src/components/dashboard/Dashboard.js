import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from "../general/Spinner";

class Dashboard extends Component {
    render() {
        const { projects, auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>;

        const projectContent = projects ?  <ProjectList projects={ projects }/> : <Spinner/>;

        return (
            <div className="dashboard container containerInfo">
                <div className="row">
                    <div>
                        { projectContent }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        storage: state.firebase.storage,
        firebase: state.firebase
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(Dashboard);