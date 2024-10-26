import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../users/userOps";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async ({ filters, page, limit }, { rejectWithValue }) => {
    const { keyword, category, species, sex, byPopularity, locationId } =
      filters;

    const params = {
      keyword,
      category,
      species,
      sex,
      byPopularity,
      locationId,
      page,
      limit,
    };
    try {
      const response = await instance.get("/notices/", {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "notices/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/categories");
      return { categories: data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSex = createAsyncThunk(
  "notices/fetchSex",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/sex");
      return { sex: data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSpecies = createAsyncThunk(
  "notices/fetchSpecies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/notices/species");
      return { species: data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllLocations = createAsyncThunk(
  "notices/fetchAllLocations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/cities/locations`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLocations = createAsyncThunk(
  "notices/fetchLocations",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/cities?keyword=${query}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFavorite = createAsyncThunk(
  "notices/fetchFavorite",
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;
    try {
      const response = await instance.get(`/notices/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchViewed = createAsyncThunk(
  "notices/fetchViewed",
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;
    try {
      const response = await instance.get(`/notices/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
