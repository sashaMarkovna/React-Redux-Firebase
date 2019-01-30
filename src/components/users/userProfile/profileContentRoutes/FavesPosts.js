import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import connect from 'react-redux/es/connect/connect';
import { cleanSearchState, selectedSearch } from '../../../../store/actions/searchActions';
import Spinner from '../../../general/Spinner';
import PostsList from '../../../posts/PostsList';
import PageNotFound from '../../../general/PajeNotFound';


class PersonalPosts extends Component {

  state = {
    isLoaded: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) { console.log('props', this.props.postsLikes); }
    if (this.props.postsLikes
        && this.props.posts
        && this.props !== prevProps
        && Object.keys(this.props.postsLikes).length
        && Object.keys(this.props.posts).length) {
      this.setState({
        favesPosts: Object.keys(this.props.postsLikes)
          .map(postId => this.props.posts[postId] ? { ...this.props.posts[postId], id: postId } : null)
          .filter(post => post),
      }, () => { this.setState({ ...this.state, isLoaded: true }); });
    }
  }


  render() {
    console.log('render likes', this.props.postsLikes);
    return (
      <Fragment>
        { this.props.postsLikes && !Object.keys(this.props.postsLikes).length
          ? <PageNotFound />
          : !this.state.isLoaded
          ? <Spinner />
          : <PostsList posts={this.state.favesPosts} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postsLikes = isLoaded(state.firestore.data.postsLikes) ? state.firestore.data.postsLikes[ownProps.id] : null;
  return {
    postsLikes,
    posts: state.firestore.data.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectedSearch: (collection, field, searchText) => dispatch(selectedSearch(collection, field, searchText)),
    cleanSearchState: () => dispatch(cleanSearchState()),
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
      return [
            { collection: 'postsLikes', doc: props.id },
            { collection: 'posts' },
      ];
    }),
)(PersonalPosts);
