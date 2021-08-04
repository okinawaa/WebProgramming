import React from 'react';
import {Link} from 'react-router-dom'
import './header.css'

function GlobalNav(props) {
    return (
        <nav className="global-nav">
            <div className="global-nav-links">
                <Link to='/' className="global-nav-item">
                    Rooms
                </Link>
                <Link to='/' className="global-nav-item">
                    Ideas
                </Link>
                <Link to='/' className="global-nav-item">
                    Stores
                </Link>
                <Link to='/' className="global-nav-item">
                    Contact
                </Link>
            </div>

        </nav>
    );
}

export default GlobalNav;