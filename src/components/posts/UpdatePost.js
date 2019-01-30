import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import autosize from 'autosize';
import { firestoreConnect } from 'react-redux-firebase';
import { cleanPostState, updatePost } from '../../store/actions/postsActions';
import { cleanUploadState, deleteFile, uploadFileAndReturnUrl } from '../../store/actions/storageActions';
import FileInput from '../general/FileInput';


class UpdatePost extends Component {
  state = {
    bannerUrl: '',
    fileDeleted: false,
    editedPost: null,
  };

  componentDidMount() { if (this.props.post) { this.loadProjectData(this.props.post); } }

  componentDidUpdate(prevProps) {
        // Update post bannerUrl
    if (this.props.uploadFileUrl) {
      this.setState({
        editedPost: {
          ...this.state.editedPost,
          headlineBanner: this.props.uploadFileUrl,
        },
      }, () => {
        this.props.updatePost(this.props.id, this.state.editedPost);
        if (this.state.bannerUrl) { this.props.deleteFile(this.state.bannerUrl); }
        this.props.history.push(`/post/${this.props.id}`);
      });
    }

    if (this.props.post !== prevProps.post) { this.loadProjectData(this.props.post); }
  }

  componentWillUnmount() {
    this.props.cleanUploadState();
    this.props.cleanPostState();
  }

  returnFileData = () => { this.setState({ fileDeleted: false, fileData: null }); };

  updateFileData = (data) => { this.setState({ fileData: { ...data }, fileDeleted: true }); };

  deleteFileData = () => {
    this.state.fileData
    ? this.setState({ fileData: null, fileDeleted: true })
    : this.setState({ fileDeleted: true });
  };

  loadProjectData = (post) => {
    this.setState({ ...this.state, bannerUrl: post.headlineBanner });
    document.getElementById('content').value = post.content;
    document.getElementById('title').value = post.title;
    autosize(this.textarea);
  };

  handleChange = (e) => { this.setState({ editedPost: { [e.target.id]: e.target.value } }); };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  };


  handleSubmit = (e) => {
    e.preventDefault();
        // Update post banner
    if (this.state.fileData) {
      this.props.uploadFileAndReturnUrl(this.state.fileData);
        // Delete postBanner && update post
    } else if (this.state.bannerUrl && this.state.fileDeleted) {
      this.setState({ editedPost: { ...this.state.editedPost, headlineBanner: '' } }, () => {
        this.props.updatePost(this.props.id, this.state.editedPost);
        this.props.deleteFile(this.state.bannerUrl);
        this.props.history.push(`/project/${this.props.id}`);
      });
    } else if (this.state.editedPost) {
      this.props.updatePost(this.props.id, this.state.editedPost);
      this.props.history.push(`/project/${this.props.id}`);
    }
  };


  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white create-project">
          <FileInput
            updateFileData={this.updateFileData}
            deleteFileData={this.deleteFileData}
            path={'post'}
            imgUrl={this.state.bannerUrl ? this.state.bannerUrl : ''}
            returnFileData={this.returnFileData}
          />
          <div className="input-field">
            <label htmlFor="title" className="active">Post Title</label>
            <input
              className="create-project__title"
              type="text"
              id="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="content" className="active">Post Content</label>
            <textarea
              className="materialize-textarea create-project__content-input"
              id="content"
              onChange={this.handleChange}
              ref={c => this.textarea = c}
            />
          </div>
          <div className="input-field create-project__btn-block">
            <button className="btn teal lighten-1 z-depth-0">Submit</button>
            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id ? ownProps.match.params.id : null;
  const posts = state.firestore.data.projects;
  const post = posts ? posts[id] : null;
  return {
    id,
    post,
    auth: state.firebase.auth,
    uploadFileUrl: state.storage.uploadFileUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFileAndReturnUrl: fileData => dispatch(uploadFileAndReturnUrl(fileData)),
    cleanPostState: () => dispatch(cleanPostState()),
    deleteFile: fileUrl => dispatch(deleteFile(fileUrl)),
    updatePost: (projectId, projectData) => dispatch(updatePost(projectId, projectData)),
    cleanUploadState: () => dispatch(cleanUploadState()),
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'posts' }]),
)(UpdatePost);
