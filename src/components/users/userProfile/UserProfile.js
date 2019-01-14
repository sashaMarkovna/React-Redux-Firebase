import React, { Component } from 'react';
import { compose } from "redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import UserBanner from "./UserBanner";
import ChangeProfileQuote from "./ChangeProfileQuote";
import ChangeUserAvatar from "./ChangeUserAvatar";
import UserPersonalPosts from "./UserPersonalPosts";
import Spinner from "../../general/Spinner";
import UserNavbar from "./UserNavbar";
import PostsList from "../../projects/PostsList";

class UserProfile extends Component {

    state = {
        showEditQuoteModal: false,
        showEditAvatarModal: false
    };

    toggleEditQuoteModal = () => { this.setState({ showEditQuoteModal: !this.state.showEditQuoteModal }) };
    toggleEditAvatarModal = () => { this.setState({ showEditAvatarModal: !this.state.showEditAvatarModal }) };

    render() {
        const { auth, user, postsLikes } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;
        console.log('likes', postsLikes);
        const id = this.props.match.params.id;
        const switchComponent = (profileContent) => {
            switch (profileContent) {
                case 'personal-posts':
                    return <UserPersonalPosts id={ id }/>;
                case 'likes':
                    if(postsLikes){ return <PostsList sortedProjects={ postsLikes }/> } else { return <Spinner/> }
                    // return <PostsList sortedProjects={ postsLikes }/>;
                case 'talks':
                    return <div>TALKS</div>;
                case 'drafts':
                    return <div>DRAFTS</div>;
                default:
                    return <UserPersonalPosts id={ id }/>;
            }
        };

        if(user) {
            return (
                <div>
                    { this.state.showEditQuoteModal ? <ChangeProfileQuote toggleEditQuoteModal={ this.toggleEditQuoteModal }/> : null}
                    { this.state.showEditAvatarModal ? <ChangeUserAvatar toggleEditAvatarModal={ this.toggleEditAvatarModal } user={user}/> : null}
                    <UserBanner user={ user } toggleEditQuoteModal={ this.toggleEditQuoteModal } toggleEditAvatarModal={ this.toggleEditAvatarModal }/>
                    <UserNavbar id={ id } uid={ auth.uid }/>
                    <div className="container profile">{ switchComponent(this.props.match.params.profileContent) }</div>
                </div>
            )
        } else {
            return ( <Spinner/> )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const user = isLoaded(state.firestore.ordered.user) ? state.firestore.ordered.user[0] : null;
    const postsLikes = isLoaded(state.firestore.data.postsLikes) ? state.firestore.data.postsLikes[ownProps.match.params.id] : null;
    console.log(postsLikes);
    return {
        user,
        postsLikes,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {collection: 'users', doc: props.match.params.id, storeAs: 'user'},
            {collection: 'postsLikes', doc: props.match.params.id}
        ]
    })
)(UserProfile);