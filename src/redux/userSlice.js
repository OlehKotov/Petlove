import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, token, id, name } = action.payload;
      state.email = email;
      state.token = token;
      state.id = id;
      state.name = name;
    },
    removeUser(state) {
      state.name = null;
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;