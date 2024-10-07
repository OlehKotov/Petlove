import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./newsOps";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
