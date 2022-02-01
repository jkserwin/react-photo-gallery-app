import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to="/ducks">Ducks</NavLink></li>
            <li><NavLink to="/spaghetti">Spaghetti</NavLink></li>
            <li><NavLink to="/australia">Australia</NavLink></li>
        </ul>
    </nav>
);

export default Nav;