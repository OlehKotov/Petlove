import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logout, register, currentUserFull, editUser } from "./userOps";

const initialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    phone: null,
    token: null,
    noticesViewed: null,
    noticesFavorites: null,
    pets: null,
    id: null,
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
      .addCase(currentUserFull.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.avatar = action.payload.avatar;
        state.user.phone = action.payload.phone;
        state.user.noticesViewed = action.payload.noticesViewed;
        state.user.noticesFavorites = action.payload.noticesFavorites;
        state.user.pets = action.payload.pets;
        state.user.id = action.payload._id;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.avatar = action.payload.avatar;
        state.user.phone = action.payload.phone;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          currentUserFull.pending,
          logout.pending,
          editUser.pending
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
          currentUserFull.rejected,
          logout.rejected,
          editUser.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});


export default userSlice.reducer;