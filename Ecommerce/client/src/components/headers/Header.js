import React, {useContext, useState} from 'react';
import {GlobalState} from "../../GlobalState";
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from "axios";

function Header(props) {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
    const [cart, setCart] = state.userAPI.cart
    const [menu,setMenu] = useState(false)

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = '/';
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to='/create_product' onClick={displayNoneHandler}>Create Products </Link></li>
                <li><Link to='/category' onClick={displayNoneHandler}>Categories </Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to='/history' onClick={displayNoneHandler}>History</Link></li>
                <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }
    const toggleMenu = () => setMenu(!menu)
    const styleMenu ={
        left:menu ? 0 : "-100%"
    }

    const displayNoneHandler = () =>{
        const whitebackground = document.querySelector('header ul');
        whitebackground.style.left = `-100%`
    }

    return (
        <header>
            <div className="menu" onClick={toggleMenu}>
                <img src={Menu} alt="" width='30'/>
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'PIPShop'}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to="/" onClick={displayNoneHandler}>{isAdmin ? 'Products' : 'Shop'}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login" onClick={displayNoneHandler}>Login ✥ Register</Link></li>
                }


                <li onClick={toggleMenu}>
                    <img src={Close} alt="" width="30" className="menu"/>
                </li>
            </ul>

            {
                isAdmin ? '' : <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to='/cart'>
                        <img src={Cart} alt="" width="30"/>
                    </Link>
                </div>
            }


        </header>
    );
}

export default Header;