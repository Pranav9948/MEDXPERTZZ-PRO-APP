import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.userDetails = null;
      localStorage.removeItem("userDetails");
    },
  },
});
export const { setCredentials,removeCredentials } = authSlice.actions;
export default authSlice.reducer;
