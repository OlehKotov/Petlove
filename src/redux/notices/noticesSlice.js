import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchAllLocations,
  fetchNotices,
  fetchSex,
  fetchSpecies,
} from "./noticesOps";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  categories: [],
  sex: [],
  species: [],
  locations: [],
  filters: {
    keyword: "",
    category: "",
    sex: "",
    species: "",
    locationId: "",
    sortBy: "",
  },
  totalPages: 1,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    updateFilters(state, action) {
      // state.filters = action.payload;
      state.filters = { ...state.filters, ...action.payload };
    },
    clearLocations(state) {
      state.locations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.sex = action.payload.sex;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.species = action.payload.species;
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addMatcher(
        isAnyOf(
          fetchNotices.pending,
          fetchCategories.pending,
          fetchSex.pending,
          fetchSpecies.pending,
          fetchAllLocations.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchNotices.rejected,
          fetchCategories.rejected,
          fetchSex.rejected,
          fetchSpecies.rejected,
          fetchAllLocations.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { updateFilters, clearLocations } = noticesSlice.actions;
export default noticesSlice.reducer;
