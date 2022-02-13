import Carousel from 'react-material-ui-carousel';
import Loader from '../../Loading'
import ReactStars from 'react-rating-stars-component'
import './Product.css'
import React,{useState,useEffect} from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from '@mui/material'
import { useParams } from 'react-router';
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios';
import {getProduct} from '../../store/product-slice.js';
import { BiJoystickButton } from 'react-icons/bi';
import {addToCart} from "../../store/Cart.js";

import { Link,useNavigate } from "react-router-dom";
const url ='http://localhost:4000';



const ProductDetail = () => {
    const history = useNavigate();
    const [quantity, setquantity] = useState(1)
    const {product,productCount,loading} = useSelector((state) => state.product)
    const { id } = useParams();                              //returns the :id
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");



    useEffect(() => {
        const fetchRoom = async () => {
            const {data} = await axios.get(`${url}/product/${id}`);
            console.log(data)
            dispatch(getProduct(data))

        }
        fetchRoom();
    },[dispatch])


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
       
    
        setOpen(false);
      };

      const increasequantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1
        setquantity(qty)
      }

      const decreasequantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setquantity(qty)
      }

      const cartclick = async () => {
        console.log(product)

        const { data } = await axios.get(`${url}/product/${id}`);

  
        dispatch(addToCart({ product: data.product._id,
          name: data.product.name,
          price: data.product.price,
          image: data.product.images[0].url,
          stock: data.product.stock,
          quantity,}))
       
          history('/cart')
      }

    return (
      <>
         {loading ? (<Loader/>) : (
        <div className='ProductDetails'>
            <div>
               <Carousel>
                   {
                       product.images && 
                        product.images.map((item,i) => (
                            <img
                                className='CarouselImage'
                                src={item.url}
                                key={i}
                            />
                        ))
                   }
               </Carousel>
            </div>


            <div>

                <div className='detailblock-1'>
                   <h2>{product.name}</h2>
                   <p>Product £{product._id}</p>
                </div>
                <div className='detailblock-2'>
                    <ReactStars/>
                </div>
                <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreasequantity}>-</button>
                    <input  type='number' value={quantity} className='qty'/>
                    <button onClick={increasequantity}>+</button>
                  </div>
                  <button onClick={cartclick}>
                    Add to Cart
                  </button>
                </div>
          
      

        <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.desc}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
           
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <ReactStars
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

         
    </div>
    )}
   </> 
  
    )
}

export default ProductDetail
