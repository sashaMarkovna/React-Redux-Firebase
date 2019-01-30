import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import CreateComment from './CreateComment';
import Comment from './Comment';


import Spinner from '../../general/Spinner';

const Comments = (props) => {
  const { comments } = props;

  return (
    <div className="comments grey lighten-4">
      <h3 className="comments__headline">People talk...</h3>
      <CreateComment id={props.id} />
      {
        !isLoaded(comments)
        ? <Spinner />
        : isEmpty(comments) || !comments.length
        ? <p className="comments__no-comments">No talks yet, be first...</p>
        : comments.map((comment) => {
          return (<Comment id={props.id} uid={props.uid} comment={comment} key={comment.id} />);
        })
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    comments: state.firestore.ordered.comments,
  };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
      return [
        {
          collection: 'projectComments',
          doc: props.id,
          subcollections: [{
            collection: 'comments',
            orderBy: ['time', 'desc'],
          }],
          storeAs: 'comments',
        },
      ];
    }),
)(Comments);
