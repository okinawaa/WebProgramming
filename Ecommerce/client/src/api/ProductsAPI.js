import React ,{useState,useEffect} from 'react';
import axios from "axios";
import {logDOM} from "@testing-library/react";

function ProductsAPI(props) {

    const [products,setproducts] = useState([])

    const getProducts = async () => {
        const res = await axios.get('/api/products')
        setproducts(res.data.products);
    }

    useEffect(()=>{
        getProducts()
    },[])


    return{
        products: [products,setproducts]
    }
}

export default ProductsAPI;
