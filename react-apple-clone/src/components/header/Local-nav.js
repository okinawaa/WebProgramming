import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './header.css'
function LocalNav(props) {
    let scrollPosition = props.scrollPosition

    if (scrollPosition > 44) {
        document.body.classList.add('local-nav-sticky');
    } else {
        document.body.classList.remove('local-nav-sticky');
    }

    return (
        <nav className="local-nav">
            <div className="local-nav-links">
            <Link to='/' className="product-name">AirMug Pro</Link>
            <Link to='/' >개요</Link>
            <Link to='/' >제품사양</Link>
            <Link to='/' >구입하기</Link>
            </div>
        </nav>
    );
}

export default LocalNav;