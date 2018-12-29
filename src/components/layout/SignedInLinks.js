import React from 'react';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authActions";
import Link from "react-router-dom/es/Link";

const SignedInLinks = (props) => {

    return (
        <ul className="right">
            <li><Link to={ '/user/' + props.userId } className="btn btn-floating pink lighten-1 initials">{ props.profile.initials }</Link></li>
            <li>
                <a href='' onClick={ props.signOut } className="nav-link">Log out</a>
            </li>
        </ul>
    )
};

const mapDispatchToProps = (dispatch) => {
    return { signOut: () => dispatch(signOut()) }
};

const mapStateToProps = (state) => {
    return {
        userId: state.firebase.auth.uid
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);