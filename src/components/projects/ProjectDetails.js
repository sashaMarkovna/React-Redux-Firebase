import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import moment from "moment";
import { deleteProject } from "../../store/actions/projectActions";

class ProjectDetails extends Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.deleteProject(this.props.id);
        this.props.history.push('/');
    };

    render() {
        const {project, auth} = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>;

        if (project) {
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{ project.title }</span>
                            <p>{ project.content }</p>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by { project.authorFirstName } { project.authorLastName }</div>
                            <div>{ moment(project.createdAt.toDate()).calendar() }</div>
                            <div>
                                <a href="#" className="red-text" onClick={ this.handleClick }>Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading project...</p>
                </div>
            );
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        project,
        id,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (projectId) => dispatch(deleteProject(projectId))
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);
