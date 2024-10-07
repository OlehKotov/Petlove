import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import newsReducer from "./news/newsSlice";
import friendsReducer from "./friends/friendsSlice";
import userReducer from "./users/userSlice";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "isLoggedIn"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    news: newsReducer,
    friends: friendsReducer,
    user: persistedUserReducer,
  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
