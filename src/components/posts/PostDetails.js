import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { findDOMNode } from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { deletePost, togglePostLike } from '../../store/actions/postsActions';
import { deleteFile } from '../../store/actions/storageActions';
import { deleteAllComments } from '../../store/actions/commentsActions';
import Comments from './projectComments/Comments';
import UserSignature from '../users/UserSignature';
import PreviewPicture from '../general/PreviewPicture';
import Spinner from '../general/Spinner';


class PostDetails extends Component {

  handleDelete = (e) => {
    e.preventDefault();

    if (this.props.post.headlineBanner) {
      this.props.deleteFile(this.props.post.headlineBanner);
    }

    this.props.deletePost(this.props.id);
    this.props.deleteAllComments(this.props.id);
    this.props.history.push('/');
  };

  handleLike = () => {
    this.props.togglePostLike(this.props.id, this.props.post.likes);
  };


  render() {
    const { post, auth, id } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (isLoaded(post)) {
      return (
        <div className="container section">
          <div className="card z-depth-0 post-details">
            <div className="card-content post-details__main">
              { post.headlineBanner ? <PreviewPicture pictureUrl={post.headlineBanner} /> : null }
              <div className="post-details__edit-post">
                <span className="card-title post-details__title">{ post.title }</span>
                { auth.uid === post.authorId ? (
                  <div className="post-details__edit-links">
                    <Link className="post-details__edit-link" to={`/post/${this.props.id}/edit`}>
                      <i
                        className="fas fa-pencil-alt link-icon"
                        onMouseOver={() => { ReactTooltip.show(findDOMNode(this.refs.foo)); }}
                        ref="edit"
                        data-tip="Edit Post"
                        data-class="edit-tooltip"
                      />
                      <ReactTooltip effect="solid" />
                    </Link>
                    <div className="post-details__delete-link" id="deletePost" onClick={this.handleDelete}>
                      <i
                        className="fas fa-trash-alt"
                        onMouseOver={() => { ReactTooltip.show(findDOMNode(this.refs.foo)); }}
                        ref="delete"
                        data-tip="Delete Post"
                        data-class="delete-tooltip"
                      />
                      <ReactTooltip effect="solid" />
                    </div>
                  </div>) : null
                }
              </div>
              <div className="post__author-info">
                <UserSignature authorProps={{ userId: post.authorId, time: post.createdAt, componentClass: 'post-author' }} />
              </div>
              <div className="post-details__content">
                { post.content.split('\n').map((item, key) => { return <span key={key}>{ item }<br /></span>; }) }
              </div>
              <div className="awesome" onClick={this.handleLike}>
                <span className="awesome__count">{ post.likes }</span>
                <img className="awesome__link responsive-img" src="/img/awesome2.jpg" alt="" />
              </div>
            </div>
            <Comments id={id} uid={auth.uid} />
          </div>
        </div>
      );
    } else if (isEmpty(post)) {
      return (
        <div className="container center">
          <p>no posts</p>
        </div>
      );
    }
    return (
      <Spinner />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts && posts[id];
  return {
    id,
    post,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: postId => dispatch(deletePost(postId)),
    deleteFile: fileUrl => dispatch(deleteFile(fileUrl)),
    deleteAllComments: postId => dispatch(deleteAllComments(postId)),
    togglePostLike: (postId, postLikes) => dispatch(togglePostLike(postId, postLikes)),
  };
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => {
      return [{ collection: 'posts', orderBy: ['createdAt', 'desc'] }];
    }),
)(PostDetails);
