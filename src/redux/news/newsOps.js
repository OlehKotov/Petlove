import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ keyword, page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://petlove.b.goit.study/api/news/",
        {
          params: { keyword, page, limit },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
