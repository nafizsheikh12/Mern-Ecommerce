import axios from 'axios';
import React,{useState,useEffect} from 'react';
import './products.css';
import {useDispatch,useSelector} from 'react-redux';
import {setProduct} from '../../store/product-slice';
//import {getProduct} from '../../axios'
import {Link,useNavigate} from 'react-router-dom';
import { useParams } from 'react-router';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';

//Component
import Product from '../../Page/Home/Product'
import Loading from '../../Loading'
import {getsProduct} from '../../axios'
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';

const Products = ({match}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {products,productCount,resultPerPage} = useSelector((state) => state.product)
    const { keyword } = useParams(); 
    const [price, setprice] = useState([0,25000])
    console.log(keyword)
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

    const priceHandler = (e,newprice) => {
        setprice(newprice)
        console.log(newprice)
    }

    useEffect(async () => {

        const url ='http://localhost:4000';
        const {data} = await getsProduct(keyword,currentPage,price);
        console.log(data)
            dispatch(setProduct(data))
    },[dispatch,keyword,price,currentPage])
    return (
        <>
            <h2 className='productHeading'>Products</h2>

            <div className="product">
            {
                     products &&
                       products.map((val) => (
                           <Product key={val._id} product={val}/>
                       ))
                 }
            </div>

            <div className="filterBox">
                 <p>Price</p>
                  <Slider
                      size="small"
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      min={0}
                      max={25000}
                      aria-labelledby="range-Slider"
                  />
            </div>
            <div className="paginationBox">
             <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
        </>
    )
}

export default Products
