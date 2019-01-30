import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/es/Link';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../../store/actions/authActions';


const SignedInLinks = (props) => {
  return (
    <ul className="right nav__list">
      <li>
        <NavLink to="/" className="nav__link nav__link--wrap">
          <i className="fas fa-th nav__link-icon" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/community" className="nav__link nav__link--wrap">
          <i className="fas fa-users nav__link-icon" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/create/post" className="nav__link nav__link--wrap"><span className="nav__link-plus">+</span>
          <i className="fas fa-pencil-alt nav__link-icon" style={{ fontSize: '20px' }} />
        </NavLink>
      </li>
      <li>
        <NavLink to={`/user/${props.userId}`} className="nav__link nav__link--wrap">
          <i className="far fa-comment nav__link-icon" />
        </NavLink>
      </li>
      <li>
        <NavLink to={`/user/${props.userId}/settings`} className="nav__link nav__link--wrap">
          <i className="fas fa-cogs nav__link-icon" />
        </NavLink>
      </li>
      <li>
        <Link
          to={`/user/${props.userId}`}
          className="btn btn-floating pink lighten-1 initials"
        >{ props.profile.initials }</Link>
      </li>
      <li>
        <p onClick={props.signOut} className="nav__link nav__link--logout nav__link--wrap">
          <i className="fas fa-sign-out-alt nav__link-icon" />
        </p>
      </li>
      <li>
        <div className={`dropdown-button ${props.showDropdownMenu ? 'active' : ''}`} onClick={props.toggleDropdown}>
          <hr className="dropdown-button__icon-line dropdown-button__icon-line--short" />
          <hr className="dropdown-button__icon-line" />
          <hr className="dropdown-button__icon-line" />
        </div>
      </li>
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { signOut: () => dispatch(signOut()) };
};

const mapStateToProps = (state) => {
  return {
    userId: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
