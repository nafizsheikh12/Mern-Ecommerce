import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: true,
  product: [],
  productCount:'',
  products: [],
  resultPerPage: 1
}

const localState = {
  loading:true,
}

export const ProductSlice = createSlice({
  name: 'auth',

  initialState,
  localState
,
  reducers: {
    setProduct: (state,action) => {
       const {products,productCount,resultPerPage} = action.payload;
       state.products = products;
       state.productCount = productCount;
       state.resultPerPage = resultPerPage;
       state.isAuth = false;
       
    },
    getProduct: (state,action) => {
      const {product} = action.payload;
      state.product = product;
      state.loading = false
    }

  },
})

// Action creators are generated for each case reducer function
export const { setProduct,getProduct } = ProductSlice.actions

export default ProductSlice.reducer