import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserSignature from "../../users/UserSignature";
import { createComment } from "../../../store/actions/commentsActions";

class CreateComment extends Component {

    state = { content: '' };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createComment(this.props.id, this.state.content);
        document.getElementById('content').value = '';
        document.getElementById('createCommentLabel').classList.remove('active');
    };

    render() {
        return (
            <div className="create-comment">
                <UserSignature authorProps={{ userId: this.props.uid, componentClass: 'comment' }} />
                <form onSubmit={this.handleSubmit} className="create-comment__form">
                    <div className="input-field">
                        <label htmlFor="content" className="create-comment__label" id="createCommentLabel">...what do you think?</label>
                        <textarea
                            className="materialize-textarea create-comment__content"
                            id="content"
                            onChange={this.handleChange}
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

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (projectId, content) => dispatch(createComment(projectId, content))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);