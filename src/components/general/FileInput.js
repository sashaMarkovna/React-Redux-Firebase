import React, { Component } from 'react';
import PreviewPicture from "./PreviewPicture";

class FileInput extends Component {

    state = {
        picture: null,
        pictureUrl: null
    };

    displayPicture = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                picture: file,
                pictureUrl: reader.result
            })
        };
        reader.readAsDataURL(file);
    };

    render() {
        const { label } = this.props;
        return (
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
                            placeholder={ label }
                        />
                    </div>
                </div>
                <PreviewPicture pictureUrl={ this.state.pictureUrl }/>
            </div>
        )
    }
}

export default FileInput;