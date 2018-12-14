import React, { Component } from 'react';
import { uploadFile } from "../../store/actions/uploadActions";
import { connect } from 'react-redux';
import UserPhoto from "../general/UserPhoto";


class ChangeUserPhoto extends Component {
    state = {
        path: this.props.match.params.fileAction,
        pictureUrl: '',
        editMyProfilePhoto: {
            location: 'avatars',
            file: '',
            collection: 'users',
            docField: 'userPhoto'
        },
        editMyProfileBanner: {
            location: 'banners',
            file: '',
            collection: 'users',
            docField: 'profileBanner'
        }
    };

    handleSubmit = (event) => {
      event.preventDefault();
      this.props.uploadFile(this.state[this.state.path]);
      this.props.history.push('/');
    };

    displayPicture = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                [this.state.path]: {
                    ...this.state[this.state.path],
                    file: file
                },
                pictureUrl: reader.result
            })
        };
        reader.readAsDataURL(file);
    };

    render() {
        console.log(this.props);

        return (
            <div className="container">
                <form onSubmit={ this.handleSubmit } className="white">
                    <h5 className="grey-text text-darken-3">Surprise us!</h5>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input
                                type="file"
                                onChange={ this.displayPicture }
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input
                                className="file-path validate"
                                type="text"
                                placeholder="Choose file"
                            />
                        </div>
                    </div>
                    <UserPhoto pictureUrl={ this.state.pictureUrl } rootComponent={'profile-page-img'}/>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (data) => dispatch(uploadFile(data))
    }
};

export default connect(null, mapDispatchToProps)(ChangeUserPhoto);