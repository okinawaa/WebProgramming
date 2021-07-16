import React, {useEffect, useState} from 'react';
import {Button, Descriptions} from "antd";
import { useDispatch } from "react-redux";
import {addToCart} from "../../../../_actions/user_actions";


function ProductInfo(props) {

    const dispatch = useDispatch();
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

    const clickHandler = () =>{
        dispatch(addToCart(props.detail._id))
    }

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="Description">{Product.description}</Descriptions.Item>
            </Descriptions>

            <br/><br/><br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button size='large' shape='round' type='danger' onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>


        </div>
    );
}

export default ProductInfo;