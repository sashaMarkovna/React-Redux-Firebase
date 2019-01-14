import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect} from 'react-router-dom';
import Spinner from "../general/Spinner";
import PostsList from "../projects/PostsList";

class Dashboard extends Component {

    render() {
        const { projects, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;
        return (
            <div className="dashboard container containerInfo">
                { isLoaded(projects) ? <PostsList projects={ projects }/> : <Spinner/> }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    ])
)(Dashboard);