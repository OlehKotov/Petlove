import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import newsReducer from "./news/newsSlice";
import friendsReducer from "./friends/friendsSlice";
import userReducer from "./users/userSlice";
import noticesReducer from './notices/noticesSlice'

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "isLoggedIn"],
};

const noticesPersistConfig = {
  key: "notices",
  storage,
  whitelist: ["notices"],
};

const persistedNoticesReducer = persistReducer(
  noticesPersistConfig,
  noticesReducer
);

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    news: newsReducer,
    friends: friendsReducer,
    user: persistedUserReducer,
    notices: persistedNoticesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
