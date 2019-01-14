import React, { Fragment } from 'react';
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import Spinner from "../general/Spinner";
import ProjectSummary from "./ProjectSummary";

const SortedPosts = (props) => {

    const { project } = props;

    if(project) {
        return (

                <ProjectSummary project={ project } />

            )
    } else {
        return ( <Spinner/> )
    }
};

const mapStateToProps = (state, ownProps) => {
    const project = isLoaded(state.firestore.data.projects) ? state.firestore.data.projects[ownProps.projectId] : null;
    return { project }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        console.log('id', props.projectId);
        return [
            {collection: 'projects', orderBy: ['createdAt', 'desc']},
        ]
    })
)(SortedPosts);