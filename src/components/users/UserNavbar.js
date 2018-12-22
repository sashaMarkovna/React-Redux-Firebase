import React from 'react';
import SignedOutLinks from '../layout/SignedOutLinks';
import { connect } from 'react-redux';
import UserNavLinks from "./UserNavLinks";

const UserNavbar = (props) => {
    console.log(props);
    const { auth, profile } = props;
    const links = auth.uid ? <UserNavLinks profile={ profile }/> : <SignedOutLinks/>;
    return (
        <nav className="nav-wrapper yellow darken-1">
            <div className="container user-nav">
                { links }
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(UserNavbar);