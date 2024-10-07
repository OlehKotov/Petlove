import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logout, currentUser, register } from "./userOps";

const initialState = {
  user: {
    name: null,
    email: null,
    token: null,
  },
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.token = action.payload.token;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          currentUser.pending,
          logout.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          currentUser.rejected,
          logout.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});


export default userSlice.reducer;
