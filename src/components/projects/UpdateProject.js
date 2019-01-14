import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import FileInput from "../general/FileInput";
import { cleanProjectState, updateProject } from "../../store/actions/projectActions";
import { cleanUploadState, deleteFile, uploadFileAndReturnUrl } from "../../store/actions/storageActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import autosize from 'autosize';

class UpdateProject extends Component {
    state = {
        bannerUrl: '',
        fileDeleted: false,
        editedProject: null
    };

    returnFileData = () => {
        this.setState({ fileDeleted: false, fileData: null });
    };

    updateFileData = (data) => {
        this.setState({ fileData: { ...data }, fileDeleted: true });
    };

    deleteFileData = () => {
        this.state.fileData ? this.setState({ fileData: null, fileDeleted: true }) : this.setState({ fileDeleted: true });
    };

    loadProjectData = (project) => {
        this.setState({ ...this.state, bannerUrl: project.headlineBanner });
        document.getElementById('content').value = project.content;
        document.getElementById('title').value = project.title;
        autosize(this.textarea);
    };

    handleChange = (e) => {
        this.setState({ editedProject: {[e.target.id]: e.target.value} });
    };

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    };


    handleSubmit = (e) => {
        e.preventDefault();
        // Update post banner
        if(this.state.fileData) {
            this.props.uploadFileAndReturnUrl(this.state.fileData);
        //Delete postBanner && update post
        } else if(this.state.bannerUrl && this.state.fileDeleted) {
            this.setState({ editedProject: { ...this.state.editedProject, headlineBanner: '' }}, () => {
                this.props.updateProject(this.props.id, this.state.editedProject);
                this.props.deleteFile(this.state.bannerUrl);
                this.props.history.push(`/project/${ this.props.id }`);
            });
        } else if(this.state.editedProject) {
            this.props.updateProject(this.props.id, this.state.editedProject);
            this.props.history.push(`/project/${ this.props.id }`);
        }
    };


    componentDidUpdate(prevProps) {
        // Update post bannerUrl
        if(this.props.uploadFileUrl) {
            this.setState({ editedProject: { ...this.state.editedProject, headlineBanner: this.props.uploadFileUrl }}, () => {
                this.props.updateProject(this.props.id, this.state.editedProject);
                if(this.state.bannerUrl) { this.props.deleteFile(this.state.bannerUrl); }
                this.props.history.push(`/project/${ this.props.id }`);
            });
        }

        if(this.props.project !== prevProps.project) { this.loadProjectData(this.props.project); }
    }

    componentDidMount() {
        if(this.props.project) { this.loadProjectData(this.props.project); }
    }

    componentWillUnmount() {
        this.props.cleanUploadState();
        this.props.cleanProjectState();
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white create-project">
                    <FileInput
                        updateFileData={ this.updateFileData }
                        deleteFileData={ this.deleteFileData }
                        path={ 'post' }
                        imgUrl={ this.state.bannerUrl ? this.state.bannerUrl : '' }
                        returnFileData={ this.returnFileData }
                    />
                    <div className="input-field">
                        <label htmlFor="title" className="active">Project Title</label>
                        <input
                            className="create-project__title"
                            type="text"
                            id="title"
                            onChange={ this.handleChange }
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" className="active">Project Content</label>
                        <textarea
                            className="materialize-textarea create-project__content-input"
                            id="content"
                            onChange={ this.handleChange }
                            ref={ c => this.textarea = c }
                        />
                    </div>
                    <div className="input-field create-project__btn-block">
                        <button className="btn teal lighten-1 z-depth-0">Submit</button>
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
        uploadFileUrl: state.storage.uploadFileUrl,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
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
    ]))(UpdateProject);