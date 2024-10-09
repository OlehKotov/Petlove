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
export const selectUserAvatar = (state) => state.user.user.avatar;
export const selectUserPhone = (state) => state.user.user.phone;
export const selectUserNoticesViewed = (state) => state.user.user.noticesViewed;
export const selectUserNoticesFavorites = (state) => state.user.user.noticesFavorites;
export const selectUserPets = (state) => state.user.user.pets;
export const selectUserId = (state) => state.user.user._id;

export const selectToken = (state) => state.user.user.token;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;