import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

class Nav extends Component {

    render() {
        const {location, text, path} = this.props;
        const isCurrent = location.pathname === path;
        const current = isCurrent ? (<span className="sr-only">(current)</span>) : null;

        return (
            <li className="nav-item">
                <NavLink className="nav-link" to={path} activeClassName="active">{text} {current}</NavLink>
            </li>
        );
    }
}

Nav.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

const Sidebar = (props) => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <Nav {...props} text="Clients" path="/client" />
                <Nav {...props} text="Users" path="/user" />
            </ul>
        </div>
    </nav>
);

export default Sidebar