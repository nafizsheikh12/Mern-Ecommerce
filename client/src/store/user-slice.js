import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  user: [],
}

export const userSlice = createSlice({
  name: 'User',
  initialState,

  reducers: {
    setUser: (state,action) => {
       const {user} = action.payload;
       state.user = user;
       state.isAuth = true;
      
    },
  logout:(state,action) => {
    const {user} = action.payload;
    state.user = null;
    state.isAuth = false;
  
  }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUser,logout } = userSlice.actions

export default userSlice.reducer