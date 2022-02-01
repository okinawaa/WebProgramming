import React, {useEffect} from 'react';
import {animateScroll as scroll} from 'react-scroll'
import {
    Nav,
    NavbarContainer,
    NavLogo,
} from "./NavbarElement.js";

const toggleHome = () => {
    scroll.scrollToTop({
        duration: 3000,
    })
}

function NavBar({setClickNavBanner}) {
    useEffect(() => {
        setClickNavBanner(false);
    }, [setClickNavBanner])
    return (
        <Nav>
            <NavbarContainer>
                <NavLogo
                    to="/" onClick={() => {
                    toggleHome()
                    setClickNavBanner(true);
                }}>
                    Bullien
                </NavLogo>
            </NavbarContainer>
                {/*<NavLogo to='/archive'>asdasd</NavLogo>*/}
        </Nav>
    )
}

export default NavBar;