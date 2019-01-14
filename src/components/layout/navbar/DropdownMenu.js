import React, { Component } from 'react';
import {NavLink, Redirect} from "react-router-dom";
import { signOut } from "../../../store/actions/authActions";
import { connect } from 'react-redux';

class DropdownMenu extends Component {

    componentDidMount() {
        document.getElementById('dropdownList').addEventListener('click', (e) => {
            if(e.target.tagName === 'A') { this.props.toggleDropdown() }
        })
    }

    handleLogOut = () => {
        this.props.toggleDropdown();
        this.props.signOut();
        return <Redirect to='/signin'/>
    };

    render() {
        return (
            <div className="dropdown">
                <ul className="dropdown__list container" id="dropdownList">
                    <li>
                        <NavLink to="/" className="nav__link">
                            Main Feed
                            <i className="fas fa-th nav__link-icon"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/community" className="nav__link">
                            Community
                            <i className="fas fa-users nav__link-icon"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create/post" className="nav__link">
                            New Post
                            <span className="nav__link-plus">+
                                <i className="fas fa-pencil-alt nav__link-icon" style={{fontSize: '20px'}}/>
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/user/' + this.props.userId} className="nav__link">
                            Messages
                            <i className="far fa-comment nav__link-icon"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/user/${ this.props.userId }/settings`} className="nav__link">
                            Settings
                            <i className="fas fa-cogs nav__link-icon"/>
                        </NavLink>
                    </li>
                    <li>
                        <p onClick={ this.handleLogOut } className="nav__link nav__link--logout">
                            Log out
                            <i className="fas fa-sign-out-alt nav__link-icon"/>
                        </p>
                    </li>
                </ul>
                <div>
                    <i className="fas fa-times right modal-window__close-icon" onClick={ this.props.toggleDropdown }/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { signOut: () => dispatch(signOut()) }
};

const mapStateToProps = (state) => {
    return {
        userId: state.firebase.auth.uid
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);