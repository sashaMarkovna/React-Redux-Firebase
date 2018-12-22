import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authActions";

const UserNavLinks = (props) => {

    return (
        <ul>
            <li>
                <NavLink to="/create" className="nav-link nav-link--profile-nav">
                    <i className="fas fa-pencil-alt link-icon" style={{fontSize: '20px'}}></i>
                    New Post
                </NavLink></li>
            <li>
                <NavLink to={'/user/' + props.userId} className="nav-link nav-link--profile-nav">
                    <i className="far fa-comment link-icon"></i>
                    Messages
                </NavLink>
            </li>
            <li>
                <NavLink to={`/user/${props.userId}/settings`} className="nav-link nav-link--profile-nav">
                    <i className="fas fa-cogs link-icon"></i>
                    Settings
                </NavLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserNavLinks);