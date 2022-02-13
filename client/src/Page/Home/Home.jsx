import React,{useState,useEffect} from 'react'
import {CgMouse} from 'react-icons/all'
import "./Home.css"
import {useDispatch,useSelector} from 'react-redux';
import {setProduct} from '../../store/product-slice';
import {getProduct} from '../../axios'


//componet
import Header from '../../Component/header/Header'
import Footer from '../../Component/Footer/Footer'
import Product from './Product'
import Loading from '../../Loading'

const Home = () => {
    const {products,productCount,isAuth} = useSelector((state) => state.product)
    const dispatch = useDispatch();
    const [rooms, setrooms] = useState([])
   
    useEffect(() => {
        const fetchRoom = async () => {
            const {data} = await getProduct();
            dispatch(setProduct(data))
        }
        fetchRoom();
    },[dispatch,products])

    return (
        <div className="home">
           <div className="banner">
              <p>Welcome to ecommerce</p>
              <h1>Find Amazing Products Below</h1>
              <a>
                <button>
                    Scroll <CgMouse/>
                </button>
              </a>
           </div>
    
            <h2 className="homeheading">Featured Products</h2>
        { isAuth ? ( <Loading/> ) : (
            <div className="container" id="container">

            { products.map((val) =>  (
                <Product product={val}/>
            ))
        
            }   
            </div>)
        }   
        </div>
    )
}

export default Home
