import React, {Component} from 'react';
import Spinner from "../general/Spinner";
import { isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import {toggleFollow} from "../../store/actions/authActions";

class FollowLink extends Component {

    handleFollow = () => {
        this.props.toggleFollow(this.props.userId);
    };

    render() {
        const {userId, profile, auth} = this.props;
        if (userId !== auth.uid) {
            return (
                isLoaded(profile)
                    ? <div className="follow__link" onClick={ this.handleFollow }>
                         <img className="responsive-img"
                             src={`/img/${ profile.following[userId] ? 'unfollow-pink.jpg' : 'follow-teal.jpg' }`}
                             alt=""/>
                      </div>
                    : <Spinner/>
            )
        } else { return null }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFollow: (userId) => dispatch(toggleFollow(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowLink);