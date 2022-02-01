import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to="/duck">Ducks</NavLink></li>
            <li><NavLink to="/spaghetti">Spaghetti</NavLink></li>
            <li><NavLink to="/ron">Ron</NavLink></li>
        </ul>
    </nav>
);

export default Nav;