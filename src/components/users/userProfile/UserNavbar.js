import React from 'react';
import NavLink from "react-router-dom/es/NavLink";

const UserNavbar = ({ id, uid }) => {

    const activeStyle = {
        background: '#b2dfdb',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        boxShadow: '10px 5px 5px -3px rgba(0,0,0,0.7)',
        height: '41px',
        borderBottomLeftRadius: '3px'
    };

    return (
        <nav className="nav-wrapper white user-nav">
            <div className="container ">
                <ul className="right user-nav__list right">
                    <li>
                        <NavLink exact={ true } to={`/user/${ id }`} className="user-nav__link active" activeStyle={activeStyle}>
                            Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact={ true } to={`/user/${ id }/likes`} className="user-nav__link" activeStyle={activeStyle}>
                            likes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact={ true } to={`/user/${ id }/talks`} className="user-nav__link" activeStyle={activeStyle}>
                            talks
                        </NavLink>
                    </li>
                    {
                        id === uid
                        ? ( <li>
                               <NavLink exact={ true } to={`/user/${ id }/drafts`} className="user-nav__link" activeStyle={activeStyle}>
                                   Drafts
                               </NavLink>
                            </li> )
                        : null }
                </ul>
            </div>
        </nav>
    )
};

export default UserNavbar;