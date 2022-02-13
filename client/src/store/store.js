import {configureStore} from '@reduxjs/toolkit'
import user from './user-slice';
import product from './product-slice'
import Cart from './Cart'


export const store = configureStore({
    reducer: {
         product,
         user,
         Cart   
    }
})