import React, { Component } from 'react';
import UserPhoto from "../general/UserPhoto";
import PreviewPicture from "../general/PreviewPicture";


class FileInput extends Component {
    state = {
        path: this.props.path,
        imgUrl: '',
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
        },
        post: {
            location: 'projectBanners',
            file: '',
            collection: 'projects',
            docField: 'projectBanner'
        }
    };

    componentDidUpdate(prevProps) {
        if(this.props.imgUrl !== prevProps.imgUrl) {
            this.setState({
                ...this.state,
                imgUrl: this.props.imgUrl
            })
        }
        console.log(this.state);
    }

    handleDelete = () => {
        this.setState({
            ...this.state,
            [this.state.path]: {
                ...this.state[this.state.path],
                file: '' },
            imgUrl: ''
        });
        this.props.deleteFileData();
    };

    handleCancel = () => {
        this.setState({
            ...this.state,
            imgUrl: this.props.imgUrl
        });
        this.props.returnFileData();
    };

    displayPicture = (event) => {
        if(event.target.files.length) {
            const reader = new FileReader();
            const file = event.target.files[0];
            console.log('file ', file);
            reader.onloadend = () => {
                this.setState({
                    ...this.state,
                    [this.state.path]: {
                        ...this.state[this.state.path],
                        file: file
                    },
                    imgUrl: reader.result
                });
                this.props.updateFileData(this.state[this.state.path]);
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
                            <i className="fas fa-camera-retro add-file__add-icon"/>
                            { this.props.imgUrl && this.state.imgUrl !== this.props.imgUrl ? <i onClick={ this.handleCancel } className="fas fa-undo-alt add-file__cancel-icon"/> : null }
                            { this.state.imgUrl ? <i onClick={ this.handleDelete } className="fas fa-times add-file__delete-icon"/> : null }
                            <input
                                type="file"
                                onChange={ this.displayPicture }
                            />
                        </div>
                        <div className="file-path-wrapper" style={{width: '0', height: '0'}}>
                            <input
                                className="file-path validate"
                                type="text"
                                placeholder={ this.props.inputPlaceholder }
                                style={{ width: '0' }}
                            />
                        </div>
                    </div>
                </div>
                { this.state.path === 'editMyProfilePhoto' && this.state.imgUrl ? <UserPhoto pictureUrl={ this.state.imgUrl } rootComponent={'--edit'}/> : <PreviewPicture pictureUrl={ this.state.imgUrl }/>}
            </div>
        )
    }
}

export default FileInput;