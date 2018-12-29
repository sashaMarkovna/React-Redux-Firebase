import React, { Component } from 'react';
import { fileUpdate } from "../../store/actions/uploadActions";
import { connect } from 'react-redux';
import UserPhoto from "../general/UserPhoto";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PreviewPicture from "../general/PreviewPicture";


class ChangeUserPhoto extends Component {
    state = {
        path: this.props.match.params.filePath,
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
      this.props.fileUpdate(this.state[this.state.path]);
      this.props.history.push(`/user/${this.props.match.params.id}`);
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
                imgUrl: reader.result
            })
        };
        reader.readAsDataURL(file);
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={ this.handleSubmit } className="white">
                    <h5 className="grey-text text-darken-3">Surprise us!</h5>
                    <div>
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
                    </div>
                    { this.state.path === 'editMyProfilePhoto' ? <UserPhoto pictureUrl={ this.state.pictureUrl } rootComponent={'--edit'}/> : <PreviewPicture pictureUrl={ this.state.pictureUrl }/>}
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Edit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.firestore.ordered.users }
};

const mapDispatchToProps = (dispatch) => {
    return { fileUpdate: (data) => dispatch(fileUpdate(data)) }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        return [{
            collection: 'users',
            doc: props.match.params.id
        }];
    }))(ChangeUserPhoto);