import React, { Component } from 'react';
import UserSignature from "../../users/UserSignature";
import {deleteComment} from "../../../store/actions/commentsActions";
import { connect } from 'react-redux';

class Comment extends Component {

    handleDelete = () => {
        this.props.deleteComment(this.props.id, this.props.comment.id);
    };

    render() {

        const { comment, uid } = this.props;

        return (
            <div className="comment">
                <div className="comment__author-block">
                    <UserSignature authorProps={{time: comment.time, userId: comment.authorId, componentClass: 'comment'}}/>
                    {
                        comment.authorId === uid
                            ? <div className="comment__delete" onClick={ this.handleDelete }>Delete</div>
                            : null
                    }
                </div>
                <div className="comment__content">{comment.content}</div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (projectId, commentId) => dispatch(deleteComment(projectId, commentId))
    }
};

export default connect(null, mapDispatchToProps)(Comment);