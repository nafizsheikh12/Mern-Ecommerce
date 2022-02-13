import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'

const options ={
    edit: false,
    activeColor: "tomato",
    value:2.5,
    isHalf:true,
    
}

const Product = ({product}) => {
    return (
        <Link className="productCard shadow" to={`/product/${product._id}`}>
            <img src={product.images[0].url}/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options}/> <span>({product.numofreviews} reiews)</span>
            </div>
            <span>{product.price}</span>
        </Link>
    )
}

export default Product
