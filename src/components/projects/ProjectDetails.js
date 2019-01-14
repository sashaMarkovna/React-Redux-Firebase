import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import { Link, Redirect } from "react-router-dom";
import {deleteProject, togglePostLike} from "../../store/actions/projectActions";
import PreviewPicture from "../general/PreviewPicture";
import { findDOMNode } from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { deleteFile } from "../../store/actions/storageActions";
import Comments from "./projectComments/Comments";
import UserSignature from "../users/UserSignature";
import { deleteAllComments } from "../../store/actions/commentsActions";
import Spinner from "../general/Spinner";


class ProjectDetails extends Component {

    handleDelete = (e) => {
        e.preventDefault();
        if(this.props.project.headlineBanner) { this.props.deleteFile(this.props.project.headlineBanner) }
        this.props.deleteProject(this.props.id);
        this.props.deleteAllComments(this.props.id);
        this.props.history.push('/');
    };

    handleLike = () => {
        this.props.togglePostLike(this.props.id, this.props.project.likes);
    };


    render() {
        const { project, auth, id } = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>;
        if (isLoaded(project)) {
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
                                        <div className="delete-post" id="deletePost" onClick={ this.handleDelete }>
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
                            <div className="post__author-info">
                                <UserSignature authorProps={{ userId: project.authorId, time: project.createdAt, componentClass: 'project-author' }}/>
                            </div>
                            <div className="project-details__content">{ project.content.split('\n').map((item, key) => { return <span key={key}>{item}<br/></span> }) }</div>
                            <div className="awesome" onClick={ this.handleLike }>
                                <span className="awesome__count">{ project.likes }</span>
                                <img className="awesome__link responsive-img" src="/img/awesome2.jpg" alt=""/>
                            </div>
                        </div>
                        <Comments id={ id } uid={ auth.uid }/>
                    </div>
                </div>
            )
        } else if(isEmpty(project)){
            return (
                <div className="container center">
                    <p>no project</p>
                </div>
            );
        } else {
            return (
                <Spinner/>
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
        deleteAllComments: (projectId) => dispatch(deleteAllComments(projectId)),
        togglePostLike: (postId, postLikes) => dispatch(togglePostLike(postId, postLikes))
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => {
        return [
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    ]})
)(ProjectDetails);
