import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import {updateUserData} from "../../../store/actions/authActions";
import UserAvatar from "../UserAvatar";
import FollowLink from "../FollowLink";

class UserBanner extends Component {

    handleDelete = () => {
        this.props.updateUserData({profileQuote: ''})
    };

    render() {
        const {user, auth} = this.props;
        const followers = user.followers ? Object.keys(user.followers).length : 0;
        const following = user.following ? Object.keys(user.following).length : 0;
        const memberSince = user.memberSince ? moment(user.memberSince.toDate()).format('MMMM YYYY') : '';
        const avatar = user.avatar ? <UserAvatar userAvatarUrl={ user.avatar } componentClass={ 'profile' }/> : null;

        return (
            <div className="profile-banner white">
                <div className="container">
                    <div className="profile-banner__content">
                        <div className="profile-banner__avatar">
                            {
                                user.id === auth.uid
                                    ?   <div className="profile-banner__edit-avatar-icon" onClick={ this.props.toggleEditAvatarModal }>
                                            <i className="fas fa-camera-retro"/>
                                        </div>
                                    : null
                            }
                            <div className={`profile-banner__avatar-border`}>
                                { avatar }
                            </div>
                        </div>
                        <div className="follow">
                            {/*<div className="profile-banner__send-message-link">*/}
                                {/*<img  className="responsive-img" src="/img/message.jpg" alt=""/>*/}
                            {/*</div>*/}

                            <FollowLink userId={ user.id }/>
                        </div>
                        <div className="profile-banner__user-summery">
                            <div className="profile-banner__main-info">
                                <div>
                                    <p className="profile-banner__user-name">{ user ? `${ user.firstName } ${ user.lastName }` : null }</p>
                                    <p className="profile-banner__member-since">
                                        <span>blogapp</span>ed since
                                        { memberSince }
                                    </p>
                                    <div className="profile-banner__followers-following-links">
                                        <p>
                                            <span>{ followers } </span>Followers  <span>{ following } </span> Following
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {
                                user.id === auth.uid && !user.profileQuote
                                ?   <div className="profile-banner__add-quote" id="quote" onClick={ this.props.toggleEditQuoteModal }>Add a Quote . . .</div>
                                : null
                            }

                            {
                                user.profileQuote
                                ? ( <p className="profile-banner__quote">"{ user.profileQuote }"
                                        { user.id === auth.uid
                                            ? (
                                                <Fragment>
                                                    <span className="profile-banner__edit-quote" id="quote" onClick={ this.props.toggleEditQuoteModal }>Edit</span>
                                                    <span className="profile-banner__delete-quote" onClick={ this.handleDelete }>Delete</span>
                                                </Fragment>
                                            )
                                            : null
                                        }
                                    </p> )
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { auth: state.firebase.auth }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (newData) => dispatch(updateUserData(newData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBanner);