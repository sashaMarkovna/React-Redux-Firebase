import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import DropdownMenu from "./DropdownMenu";

class Navbar extends Component {

    state = { showDropdownMenu: false };

    toggleDropdown = () => {
        this.setState({ showDropdownMenu: !this.state.showDropdownMenu })
    };

    render() {
        const { auth, profile } = this.props;
        const links = auth.uid ? <SignedInLinks profile={ profile } toggleDropdown={ this.toggleDropdown } showDropdownMenu={ this.state.showDropdownMenu }/> : <SignedOutLinks/>;
        return (
            <nav className="nav-wrapper black darken-3 header-nav">
                <div className="container">
                    <Link to="/" className="brand-logo left">BlogApp</Link>
                    { links }
                    { auth.uid && this.state.showDropdownMenu ? <DropdownMenu toggleDropdown={ this.toggleDropdown }/> : null }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(Navbar);