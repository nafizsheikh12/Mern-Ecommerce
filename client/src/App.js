import './App.css';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import {useSelector} from 'react-redux'
//componet
import Home from './Page/Home/Home'
import Footer from './Component/Footer/Footer';
import Header from './Component/header/Header';
import Loading from './Loading'
import ProductDetail from './Page/Home/ProductDetail'
import Products from './Component/products/Products'
import Search from './Component/products/Search'
import Login from './Component/login/LoginSign'
import Useroption from './Component/header/Useroption';
import Profile from './Component/profile/Profile'
import Cart from './Page/cart/ShopCart'
import Shipping from './Page/cart/Shipping';
import ConfirmOrder from './Page/cart/ConfirmOrder';

function App() {
  const {user,isAuth} = useSelector((state) => state.user)
  return (
   <BrowserRouter>
      <>
        <Header/>
             {
               isAuth &&  <Useroption user={user}/>
             }  

              <Routes>
                  <Route path="/"  element={<Home/>} />
                  <Route path="/sad"  element={<Loading/>} />
                  <Route path="/product/:id"  element={<ProductDetail/>} />
                  <Route path="/products"  element={<Products/>} />
                  <Route path="/Search"  element={<Search/>} />
                  <Route path="/products/:keyword" element={<Products/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/cart" element={<Cart/>} />
                   <Route path="/shipping" element={<Shipping/>} />
                   <Route path="/order/confirm" element={<ConfirmOrder/>} />
            </Routes>
        <Footer/>
      </>
   </BrowserRouter> 
    
  );
}

export default App;
