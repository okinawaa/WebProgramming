import React, {useEffect, useState} from 'react';
import GlobalNav from "./Global-nav";
import LocalNav from "./Local-nav";
import './header.css'
function Header(props) {





    return (
        <div className="container">
            <GlobalNav scrollPosition={props.scrollPosition}/>
            <LocalNav scrollPosition={props.scrollPosition}/>
        </div>
    );
}

export default Header;