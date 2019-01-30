import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../general/Spinner';
import PostsList from '../posts/PostsList';
// import PropTypes from 'prop-types';


class Dashboard extends Component {

  render() {
    const { posts, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container containerInfo">
        { isLoaded(posts) ? <PostsList posts={posts} /> : <Spinner /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
  };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'posts', orderBy: ['createdAt', 'desc'] }]),
)(Dashboard);
