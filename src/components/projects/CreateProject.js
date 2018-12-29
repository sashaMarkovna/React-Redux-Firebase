import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import FileInput from "../general/FileInput";
import {cleanProjectState, createProject, updateProject} from "../../store/actions/projectActions";
import {cleanUploadState, deleteFile, uploadFileAndReturnUrl} from "../../store/actions/uploadActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import autosize from 'autosize';

class CreateProject extends Component {
    state = {
        bannerUrl: '',
        fileDeleted: false,
        projectData: {
            title: '',
            content: '',
            headlineBanner: ''
        },
        editedProject: null
    };

    returnFileData = () => {
        this.setState({ fileDeleted: false, fileData: null });
    };

    updateFileData = (data) => {
        this.setState({
            ...this.state,
            fileData: { ...data },
            fileDeleted: true
        });
    };

    deleteFileData = () => {
        if(this.state.fileData) {
            this.setState({
                ...this.state,
                fileData: null,
                fileDeleted: true
            });
        } else {
            this.setState({ fileDeleted: true });
        }
    };

    loadProjectData = (project) => {
        this.setState({ ...this.state, bannerUrl: project.headlineBanner });
        document.getElementById('content').value = project.content;
        document.getElementById('title').value = project.title;
        autosize(this.textarea);
    };

    handleChange = (e) => {
        if(this.props.id) {
            this.setState({
                editedProject: {
                    ...this.state.editedProject,
                    [e.target.id]: e.target.value }
            });
        } else {
            this.setState({
                projectData: {
                    ...this.state.projectData,
                    [e.target.id]: e.target.value
                }
            });
        }
    };

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    };


    handleSubmit = (e) => {
        e.preventDefault();
        // Update Post
        if(this.props.id) {
            // Update Banner
            if(this.state.fileData) {
                this.props.uploadFileAndReturnUrl(this.state.fileData);
                //Delete Banner
            } else if(this.state.bannerUrl && this.state.fileDeleted) {
                this.setState({ editedProject: { ...this.state.editedProject, headlineBanner: '' }}, () => {
                    this.props.updateProject(this.props.id, this.state.editedProject);
                    this.props.deleteFile(this.state.bannerUrl);
                    this.props.history.push(`/project/${this.props.id}`);
                });
            } else if(this.state.editedProject) {
                this.props.updateProject(this.props.id, this.state.editedProject);
                this.props.history.push(`/project/${this.props.id}`);
            }
        // Create Post
        } else {
            if(this.state.fileData) {
                this.props.uploadFileAndReturnUrl(this.state.fileData);
            } else {
                this.props.createProject(this.state.projectData, null);
                this.props.history.push('/');
            }
        }
    };


    componentDidUpdate(prevProps) {
        // Update Post
        if(this.props.id && this.props.uploadFileUrl) {
            this.setState({ editedProject: { ...this.state.editedProject, headlineBanner: this.props.uploadFileUrl }}, () => {
                this.props.updateProject(this.props.id, this.state.editedProject);
                if(this.state.bannerUrl) { this.props.deleteFile(this.state.bannerUrl); }
                this.props.history.push(`/project/${this.props.id}`);
            });
        // Create Post
        } else if(this.props.uploadFileUrl) {
            this.setState({ projectData: { ...this.state.projectData, headlineBanner: this.props.uploadFileUrl }}, () => {
                this.props.createProject(this.state.projectData);
                this.props.history.push('/');
            });
        }

        if(this.props.id && this.props.project !== prevProps.project) {
            this.loadProjectData(this.props.project);
        }
    }

    componentDidMount() {
        if(this.props.id && this.props.project) {
            this.loadProjectData(this.props.project);
        }
    }

    componentWillUnmount() {
        this.props.cleanUploadState();
        this.props.cleanProjectState();
    }

    render() {
        const { auth, id } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white create-project">
                    <h5 className="grey-text text-darken-3 create-project__form-title">{ id ? '' : 'New Post' }</h5>
                    <FileInput
                        updateFileData={ this.updateFileData }
                        deleteFileData={ this.deleteFileData }
                        path={ id ? 'post' : this.props.match.params.filePath }
                        imgUrl={ this.state.bannerUrl ? this.state.bannerUrl : '' }
                        returnFileData={ this.returnFileData }
                    />
                    <div className="input-field">
                        <label htmlFor="title" className={ id ? 'active' : '' }>Project Title</label>
                        <input
                            className="create-project__title"
                            type="text"
                            id="title"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" className={ id ? 'active' : '' }>Project Content</label>
                        <textarea
                            className="materialize-textarea create-project__content-input"
                            id="content"
                            onChange={this.handleChange}
                            ref={c=>this.textarea=c}
                        />
                    </div>
                    <div className="input-field create-project__btn-block">
                        <button className="btn teal lighten-1 z-depth-0">{ id ? 'Submit' : 'Post' }</button>
                        <button className="btn pink lighten-1 z-depth-0" onClick={ this.handleCancel }>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id ? ownProps.match.params.id : null;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        id,
        project,
        auth: state.firebase.auth,
        uploadFileUrl: state.upload.uploadFileUrl,
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
      createProject: (project, fileUrl) => dispatch(createProject(project, fileUrl)),
      uploadFileAndReturnUrl: (fileData) => dispatch(uploadFileAndReturnUrl(fileData)),
      cleanProjectState: () => dispatch(cleanProjectState()),
      deleteFile: (fileUrl) => dispatch(deleteFile(fileUrl)),
      updateProject: (projectId, projectData) => dispatch(updateProject(projectId, projectData)),
      cleanUploadState: () => dispatch(cleanUploadState())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' },
    ]))(CreateProject);