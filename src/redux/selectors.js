

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
export const selectToken = (state) => state.user.user.token;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;
export const selectUserNoticesFavorites = (state) => state.user.user.noticesFavorites;
export const selectUserNoticesViewed = (state) => state.user.user.noticesViewed;
export const selectUserPets = (state) => state.user.user.pets;
export const selectUserId = (state) => state.user.user._id;
export const selectUserPetsName = (state) => state.user.user.pets.name;
export const selectUserPetsTitle = (state) => state.user.user.pets.title;
export const selectUserPetsImgURL = (state) => state.user.user.pets.imgURL;
export const selectUserPetsSpecies = (state) => state.user.user.pets.species;
export const selectUserPetsBirthday = (state) => state.user.user.pets.birthday;
export const selectUserPetsSex = (state) => state.user.user.pets.sex;


export const selectNotices = (state) => state.notices;
export const selectNoticesItems = (state) => state.notices.items;
export const selectNoticesTotalPages = (state) => state.notices.totalPages;
export const selectFilters = (state) => state.notices.filters;
export const selectFiltersLocation = (state) => state.notices.locations;
