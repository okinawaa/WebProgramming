import React, {useEffect, useState} from 'react';
import axios from "axios";

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([])
    const [history,setHistory] = useState([]);
    const [callback,setCallback] = useState(false);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    useEffect(()=>{
        if(token){
            const getHistory = async ()=>{

                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }


            }
            getHistory();
        }
    },[token,callback,isAdmin])


    const addCart = async (product) => {
        if (!isLogged) return alert("Please Login to continue buying!")

        //every 배열 원소들을 반복하면서 모든 원소가 조건(함수)에서 true가 나온다면 true 를 반환하고 하나라도 false 가 나오면 반복을 멈추고 false를 반호나
        // 배열이 모든 조건을 만족하는지 확인하려고 한다

        const check = cart.every(item => {
            return item._id !== product._id
        })
        // PATCH, which is used to apply partial modifications to a resource
        // PUT method requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload
        if (check) {
            setCart([...cart, {...product, quantity: 1}])
            await axios.patch('/user/addcart',{cart:[...cart,{...product,quantity:1}]},{
                headers: { Authorization:token}
            })
        } else {
            alert('This product has been added to cart')
        }
    }
    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart:[cart,setCart],
        addCart: addCart,
        history:[history,setHistory],
        callback:[callback,setCallback]
    }
}

export default UserAPI;