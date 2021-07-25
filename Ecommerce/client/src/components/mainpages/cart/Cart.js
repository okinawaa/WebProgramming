import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from "../../../GlobalState";
import {Link} from "react-router-dom";
import axios from "axios";
import PaypalButton from './PaypalButton'
import {Button, Empty} from "antd";
import {findAllByDisplayValue} from "@testing-library/react";


function Cart(props) {

    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0);
    const [token] = state.token
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()
    }, [cart,showSuccess])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }
    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })


        setCart([...cart])
        addToCart(cart)

    }

    const removeProduct = id => {
        if (window.confirm("Do you want to delete this product ? ")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }



    const tranSuccess = async (payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([]);
        setShowSuccess(true)
        addToCart([])
        alert('You have successfully placed an order.')
    }
    if (cart.length === 0) {
        return <>
            <div className="empty-box" >
                <Empty description={false}/>
            </div>
        </>
    }


    return (
        <div>
            {
                cart.map(product => (

                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt=""/>

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> -</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> +</button>
                            </div>

                            <div className="delete" onClick={() => {
                                removeProduct(product._id)
                            }}>X
                            </div>
                        </div>
                    </div>

                ))
            }


            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton total={total} tranSuccess={tranSuccess}/>
            </div>
        </div>
    );
}

export default Cart;