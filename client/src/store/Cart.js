import { createSlice } from '@reduxjs/toolkit'
import  toast  from "toastify";

const initialState = {
    cartItems: [],
    shippingInfo:{},
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  };
  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state,action) => {

        let item= action.payload;
        let quantity = item.quantity
       
        const check = state.cartItems.find((val) => val.product === item.product);
              
         if(check){
          
           console.log('id true')
           return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === check.product ? item : i
            ),
          };
         }else{
           const totalprice = state.cartTotalAmount * quantity;
           const totalquantity = state.cartTotalQuantity + quantity

           
           return {
             ...state,cartItems: [...state.cartItems,item],cartTotalAmount:totalprice,cartTotalQuantity:totalquantity
           }
         }
        
         

      },
      saveshippingInfo:(state,action) => {
      
        state.shippingInfo = action.payload
  
      },
     
    },
  });
  
  export const { addToCart,saveshippingInfo } =
    cartSlice.actions;
  
  export default cartSlice.reducer;