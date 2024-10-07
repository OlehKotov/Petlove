import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://petlove.b.goit.study/api/friends/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
