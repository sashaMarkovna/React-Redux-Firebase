import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserSignature from "../users/UserSignature";

class CreateComment extends Component {

    state = {
        authorId: '',
        authorName: '',
        content: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    render() {
        return (
            <div className="create-comment">
                <UserSignature authorProps={{ authorId: this.props.uid, componentClass: 'comment' }} />
                <form className="create-comment__form">
                    <div className="input-field">
                        <label htmlFor="content" className="create-comment__label">...what do you think?</label>
                        <textarea
                            className="materialize-textarea create-comment__content"
                            id="content"
                            onChange={this.handleChange}
                            // ref={c=>this.textarea=c}
                        />
                    </div>
                    <div className="input-field create-comment__btn-block">
                        <button className="btn teal lighten-1 z-depth-0 create-comment__btn">Share</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid
    }
};

export default connect(mapStateToProps)(CreateComment);