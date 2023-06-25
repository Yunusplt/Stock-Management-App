import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, {payload})=>{
      state.loading = false;
      state.currentUser = payload.username;
      state.token = payload.token;
    },
    loginSuccess: (state,{payload})=>{
      state.loading = false;
      state.currentUser = payload.user.username;
      state.isAdmin = payload.user.is_superuser;
      state.token = payload?.key;
    },
    logoutSuccess: state =>{
      state.loading = false;
      state.token = null;
      state.currentUser = null
    },
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  registerSuccess,
  loginSuccess,
  logoutSuccess
} = authSlice.actions;
export default authSlice.reducer;
