import React from 'react'
import BtnRender from './BtnRender'

function ProductItem(props) {
    const product = props.product;
    const isAdmin = props.isAdmin;
    const deleteProduct = props.deleteProduct;
    const handleCheck = props.handleCheck;
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                                  onChange={() => handleCheck(product._id)}/>
            }
            <img src={product.images.url} alt=""/>

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <div className="product_price">
                    <span>${product.price}</span>
                </div>
                {/*<p>{product.description}</p>*/}
            </div>


            <BtnRender product={product} deleteProduct={deleteProduct}/>
        </div>
    )
}

export default ProductItem