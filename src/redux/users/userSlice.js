import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  login,
  logout,
  register,
  currentUserFull,
  editUser,
  addPet,
  deletePet,
  addFavoriteNotice,
  deleteFavoriteNotice,
  addNoticeToViewed,
} from "./userOps";

const initialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    phone: null,
    token: null,
    noticesViewed: [],
    noticesFavorites: [],
    pets: [],
    id: null,
  },
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
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
      .addCase(addPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.pets = state.user.pets.filter(
          (pet) => pet._id !== action.payload._id
        );
      })
      .addCase(addFavoriteNotice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.noticesFavorites = action.payload;
      })
      .addCase(deleteFavoriteNotice.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user.noticesFavorites = state.user.noticesFavorites.filter(
        //   (noticesFavorite) => noticesFavorite._id !== action.payload._id
        // );
        state.user.noticesFavorites = action.payload;
      })
      .addCase(addNoticeToViewed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.noticesViewed = action.payload;
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
          editUser.pending,
          addPet.pending,
          deletePet.pending,
          addFavoriteNotice.pending,
          deleteFavoriteNotice.pending,
          addNoticeToViewed.pending
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
          editUser.rejected,
          addPet.rejected,
          deletePet.rejected,
          addFavoriteNotice.rejected,
          deleteFavoriteNotice.rejected,
          addNoticeToViewed.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default userSlice.reducer;
