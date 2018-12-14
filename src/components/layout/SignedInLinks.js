import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authActions";
import Link from "react-router-dom/es/Link";

const SignedInLinks = (props) => {

    return (
        <ul className="right">
            <li><NavLink to="/create">New Project</NavLink></li>
            <li><a onClick={ props.signOut }>Log out</a></li>
            <li><Link to={ '/user/' + props.userId } className="btn btn-floating pink lighten-1">{ props.profile.initials }</Link></li>
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