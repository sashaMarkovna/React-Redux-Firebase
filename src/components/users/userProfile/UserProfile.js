import React, { Component } from 'react';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { cleanSearchState, selectedSearch } from '../../../store/actions/searchActions';
import UserBanner from './UserBanner';
import ChangeProfileQuote from './ChangeProfileQuote';
import ChangeUserAvatar from './ChangeUserAvatar';
import PersonalPosts from './profileContentRoutes/PersonalPosts';
import PostsList from '../../posts/PostsList';
import Search from '../../general/Search';
import Spinner from '../../general/Spinner';
import UserNavbar from './UserNavbar';
import FavesPosts from './profileContentRoutes/FavesPosts';

class UserProfile extends Component {

  state = {
    showEditQuoteModal: false,
    showEditAvatarModal: false,
    searchParams: {
      collection: null,
      field: null,
    },
  };

  toggleEditQuoteModal = () => {
      this.setState({ showEditQuoteModal: !this.state.showEditQuoteModal });
  };

  toggleEditAvatarModal = () => {
      this.setState({ showEditAvatarModal: !this.state.showEditAvatarModal });
  };

  handleSearch = (searchText) => {
    switch (this.props.match.params.profileContent) {
      case 'likes':
        this.props.selectedSearch('userPosts', 'title', searchText);
        break;
      case 'talks':
        this.props.selectedSearch('userPosts', 'title', searchText);
        break;
      case 'drafts':
        this.props.selectedSearch('userPosts', 'title', searchText);
        break;
      default:
        this.props.selectedSearch('userPosts', 'title', searchText);
    }
  };

  render() {
    const { auth, user, postsLikes } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    const id = this.props.match.params.id;
    const switchComponent = (profileContent) => {
      switch (profileContent) {
        case 'likes':
          return <FavesPosts id={id} />;
        case 'talks':
          return <div>TALKS</div>;
        case 'drafts':
          return <div>DRAFTS</div>;
        default:
          return <PersonalPosts id={id} />;
      }
    };

    if (user) {
      return (
        <div>
          { this.state.showEditQuoteModal ? <ChangeProfileQuote toggleEditQuoteModal={this.toggleEditQuoteModal} /> : null}
          { this.state.showEditAvatarModal ? <ChangeUserAvatar toggleEditAvatarModal={this.toggleEditAvatarModal} user={user} /> : null}
          <UserBanner user={user} toggleEditQuoteModal={this.toggleEditQuoteModal} toggleEditAvatarModal={this.toggleEditAvatarModal} />
          <UserNavbar id={id} uid={auth.uid} />
          <div className="container profile">
            <Search handleSearch={this.handleSearch} />
            { this.props.searchResults ?
              <PostsList posts={this.props.searchResults} />
              : switchComponent(this.props.match.params.profileContent)
            }
          </div>
        </div>
      );
    }
    return (<Spinner />);
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = isLoaded(state.firestore.ordered.user) ? state.firestore.ordered.user[0] : null;
  const postsLikes = isLoaded(state.firestore.data.postsLikes) ? state.firestore.data.postsLikes[ownProps.match.params.id] : null;
  console.log(postsLikes);
  return {
    user,
    auth: state.firebase.auth,
    searchResults: state.post.searchResults,
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
            { collection: 'users', doc: props.match.params.id, storeAs: 'user' },
      ];
    }),
)(UserProfile);
