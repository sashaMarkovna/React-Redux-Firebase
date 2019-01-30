import React, { Component } from 'react';
import PreviewPicture from '../general/PreviewPicture';
import UserAvatar from '../users/UserAvatar';


class FileInput extends Component {
  state = {
    path: this.props.path,
    imgUrl: '',
    avatar: {
      location: 'avatars',
      file: '',
      collection: 'users',
      docField: 'avatar',
    },
    post: {
      location: 'postsBanners',
      file: '',
      collection: 'posts',
      docField: 'postBanner',
    },
  };

  componentDidMount() {
    if (this.props.imgUrl) {
      this.setState({ ...this.state, imgUrl: this.props.imgUrl });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.imgUrl !== prevProps.imgUrl) {
      this.setState({ ...this.state, imgUrl: this.props.imgUrl });
    }
  }

  handleDelete = () => {
    this.setState({
      ...this.state,
      imgUrl: '',
      [this.state.path]: { ...this.state[this.state.path], file: '' },
    });

    this.props.deleteFileData();
  };

  handleCancel = () => {
    this.setState({
      ...this.state,
      imgUrl: this.props.imgUrl,
    });

    this.props.returnFileData();
  };

  displayPicture = (event) => {
    if (event.target.files.length) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onloadend = () => {
        this.setState({
          ...this.state,
          imgUrl: reader.result,
          [this.state.path]: { ...this.state[this.state.path], file },
        }, () => {
          this.props.updateFileData(this.state[this.state.path]);
        });
      };

      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <div>
        <div className="add-file">
          <div className="file-field input-field add-file__inputs">
            <div className="btn add-file__button">
              <i className="fas fa-camera-retro add-file__add-icon" />
              {
                    this.props.imgUrl && this.state.imgUrl !== this.props.imgUrl
                    ? <i onClick={this.handleCancel} className="fas fa-undo-alt add-file__cancel-icon" />
                    : null
                  }
              {
                    this.state.path === 'post' && this.state.imgUrl
                    ? <i onClick={this.handleDelete} className="fas fa-times add-file__delete-icon" />
                    : null
                  }
              <input type="file" onChange={this.displayPicture} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        {
          this.state.path === 'avatar' && this.state.imgUrl
          ? <UserAvatar userAvatarUrl={this.state.imgUrl} componentClass={'profile'} />
          : <PreviewPicture pictureUrl={this.state.imgUrl} />
        }
      </div>
    );
  }
}

export default FileInput;
