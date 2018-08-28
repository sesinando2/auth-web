import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Authentication Server</a>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
                <NavLink className="nav-link" to="/sign-out">Sign out</NavLink>
            </li>
        </ul>
    </nav>
);

export default Header