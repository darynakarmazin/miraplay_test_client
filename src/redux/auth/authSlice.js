import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";
import {
  handleFulfilledLogOut,
  handleFulfilledPost,
  handleRefreshingFalse,
  handleRefreshingFull,
  handleRefreshingTrue,
} from "./sliceFunction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleFulfilledPost)
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logIn.fulfilled, handleFulfilledPost)
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, handleFulfilledLogOut)
      .addCase(refreshUser.pending, handleRefreshingTrue)
      .addCase(refreshUser.fulfilled, handleRefreshingFull)
      .addCase(refreshUser.rejected, handleRefreshingFalse);
  },
});

export const authReducer = authSlice.reducer;
