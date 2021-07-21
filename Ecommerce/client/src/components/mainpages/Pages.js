import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from "./utils/not_found/NotFound";
import DetailProduct from "./detailProduct/DetailProduct";
import {GlobalState} from "../../GlobalState";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Categories from "./categories/Categories";



function Pages(props) {
    const state = useContext(GlobalState)
    const [isLogged,setIsLogged] = state.userAPI.isLogged
    const [isAdmin,setIsAdmin] = state.userAPI.isAdmin

    return (

        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/detail/:id" exact component={DetailProduct}/>

            <Route path="/login" exact component={isLogged ? NotFound : Login}/>
            <Route path="/register" exact component={isLogged ? NotFound : Register}/>
            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound}/>
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound}/>
            <Route path="/category" exact component={isAdmin ? Categories : NotFound}/>

            <Route path="/cart" exact component={Cart}/>
            <Route path="*" exact component={NotFound}/>
        </Switch>

    );
}

export default Pages;