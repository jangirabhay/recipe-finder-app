import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userLogin : false,
  },

  reducers: {
    login(state) {
         state.userLogin = true;
    } ,
    logout(state) {
         state.userLogin = false;
    }
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
