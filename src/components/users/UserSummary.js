import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import UserAvatar from './UserAvatar';
import FollowLink from './FollowLink';
import { clearProp } from '../../store/actions/authActions';


class ProjectSummary extends Component {

  componentWillUnmount() {
    this.props.clearProp();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="col s12 m6 l4">
        <div className="card z-depth-0 user-summary">
          <div className="card-content grey-text text-darken-3 user-summary__content">
            <div className="user-signature__avatar">
              <Link to={`/user/${user.id}`}>
                <UserAvatar componentClass={'users-list'} userAvatarUrl={user && user.avatar} />
              </Link>
            </div>
            <div className="user-signature__name user-signature__name--users-list">
              <Link className="user-link" to={`/user/${user.id}`}>{ `${user.firstName} ${user.lastName}` }</Link>
              <p className="profile-banner__member-since">
                <span>blogapp</span>ed since
                { user && user.memberSince ? moment(user.memberSince.toDate()).format('MMMM YYYY') : '' }
              </p>
              <div className="profile-banner__followers-following-links">
                <p>
                  <span>123 </span>Followers <span>321 </span> Following
                </p>
              </div>
            </div>
            <div className="follow">
              <FollowLink userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { clearProp: () => dispatch(clearProp()) };
};

export default connect(null, mapDispatchToProps)(ProjectSummary);
