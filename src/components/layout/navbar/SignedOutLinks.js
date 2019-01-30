import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to="/signup" className="nav-link">Sign Up</NavLink></li>
      <li><NavLink to="/signin" className="nav-link">Login</NavLink></li>
    </ul>
  );
};

export default SignedOutLinks;
