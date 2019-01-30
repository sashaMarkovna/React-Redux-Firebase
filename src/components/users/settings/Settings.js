import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Link from 'react-router-dom/es/Link';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import ChangeUserNameForm from './ChangeUserNameForm';

class Settings extends Component {

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container settings">
        <div className="row">
          <div className="col s12 m6 white settings__credentials-block">
            <h5 className="grey-text text-darken-3 settings__headline">Settings</h5>
            <ChangeEmailForm auth={auth} />
            <ChangePasswordForm />
            <ChangeUserNameForm profile={profile} />
            <Link to={`/delete-user/${auth.uid}`} className="btn pink lighten-1 z-depth-0">Delete my account</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Settings);
