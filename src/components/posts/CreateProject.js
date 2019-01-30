import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import autosize from 'autosize';
import { cleanPostState, createPost } from '../../store/actions/postsActions';
import { cleanUploadState, deleteFile, uploadFileAndReturnUrl } from '../../store/actions/storageActions';
import FileInput from '../general/FileInput';

class CreateProject extends Component {
  state = {
    bannerUrl: '',
    postData: {
      title: '',
      content: '',
      headlineBanner: '',
    },
  };

  updateFileData = (data) => {
    this.setState({ ...this.state, fileData: { ...data } });
  };

  deleteFileData = () => {
    if (this.state.fileData) {
      this.setState({ ...this.state, fileData: null });
    }
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      postData: {
        ...this.state.postData,
        [e.target.id]: e.target.value,
      },
    });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  };


  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.fileData) {
      this.props.uploadFileAndReturnUrl(this.state.fileData);
    } else {
      this.props.createPost(this.state.postData, null);
      this.props.history.push('/');
    }
  };

  componentDidUpdate() {
    if (this.props.uploadFileUrl) {
      this.setState({
        postData: {
          ...this.state.postData,
          headlineBanner: this.props.uploadFileUrl,
        },
      }, () => {
        this.props.createPost(this.state.postData);
        this.props.history.push('/');
      });
    }
    autosize(this.textarea);
  }

  componentWillUnmount() {
    this.props.cleanUploadState();
    this.props.cleanPostState();
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white create-project">
          <h5 className="grey-text text-darken-3 create-project__form-title">New Post</h5>
          <FileInput
            updateFileData={this.updateFileData}
            deleteFileData={this.deleteFileData}
            path={'post'}
            imgUrl={''}
          />
          <div className="input-field">
            <label htmlFor="title">Post Title</label>
            <input
              className="create-project__title"
              type="text"
              id="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="content">Post Content</label>
            <textarea
              className="materialize-textarea create-project__content-input"
              id="content"
              onChange={this.handleChange}
              ref={c => this.textarea = c}
            />
          </div>
          <div className="input-field create-project__btn-block">
            <button className="btn teal lighten-1 z-depth-0" disabled={!this.state.postData.title || !this.state.postData.content}>Post</button>
            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    uploadFileUrl: state.storage.uploadFileUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post, fileUrl) => dispatch(createPost(post, fileUrl)),
    uploadFileAndReturnUrl: fileData => dispatch(uploadFileAndReturnUrl(fileData)),
    cleanPostState: () => dispatch(cleanPostState()),
    deleteFile: fileUrl => dispatch(deleteFile(fileUrl)),
    cleanUploadState: () => dispatch(cleanUploadState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
