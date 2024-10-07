// import { createSelector } from "@reduxjs/toolkit";

export const selectNews = (state) => state.news.items;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;
export const selectNewsTotalPages = (state) => state.news.totalPages;

export const selectFriends = (state) => state.friends.items;
export const selectFriendsLoading = (state) => state.friends.loading;
export const selectFriendsError = (state) => state.friends.error;

export const selectUserName = (state) => state.user.user.name;
export const selectUserEmail = (state) => state.user.user.email;
export const selectToken = (state) => state.user.user.token;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;