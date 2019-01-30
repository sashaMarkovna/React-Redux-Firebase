import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { firestoreConnect } from 'react-redux-firebase';
import { cleanSearchState, selectedSearch } from '../../../../store/actions/searchActions';
import Spinner from '../../../general/Spinner';
import PostsList from '../../../posts/PostsList';


class PersonalPosts extends Component {

  render() {
    const { userPosts } = this.props;
    return (
      <Fragment>
        { userPosts ? <PostsList posts={userPosts} /> : <Spinner /> }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { userPosts: state.firestore.ordered.userPosts };
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
      return [{
        collection: 'posts',
        where: ['authorId', '==', props.id],
        orderBy: ['createdAt', 'desc'],
        storeAs: 'userPosts',
      }];
    }),
)(PersonalPosts);
