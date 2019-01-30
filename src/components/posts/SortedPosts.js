import React from 'react';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import PostSummary from './PostSummary';

const SortedPosts = (props) => {
  const { post } = props;

  if (post) {
    return (
      <PostSummary post={post} />
    );
  }
  return (<Spinner />);
};

const mapStateToProps = (state, ownProps) => {
  const post = isLoaded(state.firestore.data.posts) ? state.firestore.data.posts[ownProps.postId] : null;
  return { post };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => {
      return [
            { collection: 'posts', orderBy: ['createdAt', 'desc'] },
      ];
    }),
)(SortedPosts);
