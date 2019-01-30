import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cleanUploadState, deleteUserAvatar, uploadFileAndReturnUrl } from '../../../store/actions/storageActions';
import FileInput from '../../general/FileInput';
import { updateUserData } from '../../../store/actions/authActions';


class ChangeUserAvatar extends Component {
  state = {};

  componentDidUpdate() {
    if (this.props.uploadFileUrl && this.props.user.avatar) {
      this.props.deleteUserAvatar(this.props.user.avatar);
      this.props.updateUserData({ avatar: this.props.uploadFileUrl });
      this.props.toggleEditAvatarModal();
    }
  }

  componentWillUnmount() { this.props.cleanUploadState(); }

  updateFileData = (data) => { this.setState({ ...this.state, fileData: { ...data } }); };

  returnFileData = () => { this.setState({ fileData: null }); };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.uploadFileAndReturnUrl(this.state.fileData);
  };

  render() {
    const { user } = this.props;
    const imgUrl = user.avatar;

    return (
      <div className="modal-window">
        <form onSubmit={this.handleSubmit} className="white">
          <i className="fas fa-times right modal-window__close-icon" onClick={this.props.toggleEditAvatarModal} />
          <h5 className="grey-text text-darken-3">Surprise us!</h5>
          <FileInput
            updateFileData={this.updateFileData}
            path={'avatar'}
            imgUrl={imgUrl}
            returnFileData={this.returnFileData}
          />
          <div className="input-field form__buttons">
            <button className="btn teal lighten-1 z-depth-0 submit" disabled={!this.state.fileData}>Update</button>
            <button className="btn pink lighten-1 z-depth-0" onClick={this.props.toggleEditAvatarModal}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uploadFileUrl: state.storage.uploadFileUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserAvatar: fileUrl => dispatch(deleteUserAvatar(fileUrl)),
    uploadFileAndReturnUrl: data => dispatch(uploadFileAndReturnUrl(data)),
    updateUserData: newData => dispatch(updateUserData(newData)),
    cleanUploadState: () => dispatch(cleanUploadState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserAvatar);
