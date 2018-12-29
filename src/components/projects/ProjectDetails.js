import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link, Redirect } from "react-router-dom";
import { deleteProject } from "../../store/actions/projectActions";
import PreviewPicture from "../general/PreviewPicture";
import { findDOMNode } from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { deleteFile } from "../../store/actions/uploadActions";
import Comments from "./Comments";
import UserSignature from "../users/UserSignature";


class ProjectDetails extends Component {

    handleClick = (e) => {
        e.preventDefault();
        if(this.props.project.headlineBanner) { this.props.deleteFile(this.props.project.headlineBanner) }
        this.props.deleteProject(this.props.id);
        this.props.history.push('/');
    };


    render() {
        const { project, auth, id } = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>;
        if (project) {
            return (
                <div className="container section">
                    <div className="card z-depth-0 project-details">
                        <div className="card-content project-details__main">
                            { project.headlineBanner ? <PreviewPicture pictureUrl={ project.headlineBanner }/> : null }
                            <div className="project-details__edit-post">
                                <span className="card-title project-details__title">{ project.title }</span>
                                { auth.uid === project.authorId ? (
                                    <div className="edit-post-links">
                                        <div className="edit-post">
                                            <Link className="edit-post__editLink" to={`/project/${this.props.id}/edit`}>
                                                <i
                                                    className="fas fa-pencil-alt link-icon"
                                                    onMouseOver={() => { ReactTooltip.show(findDOMNode(this.refs.foo)) }}
                                                    ref='edit'
                                                    data-tip='Edit Post'
                                                    data-class="edit-tooltip"
                                                />
                                                <ReactTooltip effect="solid"/>
                                            </Link>
                                        </div>
                                        <div className="delete-post" id="deletePost" onClick={ this.handleClick }>
                                            <i
                                                className="fas fa-trash-alt"
                                                onMouseOver={() => { ReactTooltip.show(findDOMNode(this.refs.foo)) }}
                                                ref='delete'
                                                data-tip='Delete Post'
                                                data-class="delete-tooltip"
                                            />
                                            <ReactTooltip effect="solid"/>
                                        </div>
                                    </div>) : null
                                }
                            </div>
                            <UserSignature authorProps={{ authorId: project.authorId, time: project.createdAt, componentClass: 'project-author' }}/>

                            <div className="project-details__content">{ project.content.split('\n').map((item, key) => { return <span key={key}>{item}<br/></span> }) }</div>
                        </div>
                        <Comments id={ id }/>
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
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects && projects[id];
    return {
        id,
        project,
        auth: state.firebase.auth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (projectId) => dispatch(deleteProject(projectId)),
        deleteFile: (fileUrl) => dispatch(deleteFile(fileUrl)),
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => {
        return [
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    ]})
)(ProjectDetails);
