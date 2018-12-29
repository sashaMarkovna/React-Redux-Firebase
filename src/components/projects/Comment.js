import React from 'react';
import UserSignature from "../users/UserSignature";

const Comment = ({ comment }) => {

    return (
      <div className="comment" >
          <UserSignature authorProps={{ time: comment.time, authorId: comment.authorId, componentClass: 'comment' }}/>
          <div className="comment__content">{comment.content}</div>
      </div>
    )
};

export default Comment;