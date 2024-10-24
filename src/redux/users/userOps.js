import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export const instance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () =>
  (instance.defaults.headers.common.Authorization = "");

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/users/signup", userData);
      setToken(data.token);
      toast.success("Registration successful!");
      return data;
    } catch (error) {
      toast.error(
        "Registration failed: " +
          (error.response?.data?.message || "Unknown error")
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/users/signin", userData);
      setToken(data.token);
      toast.success("Login successful!");
      return data;
    } catch (error) {
      toast.error(
        "Login failed: " + (error.response?.data?.message || "Unknown error")
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.user.token;
      if (!token) {
        clearToken();
        return;
      }
      setToken(token);
      await instance.post("/users/signout");
      clearToken();
      toast.success("Logout successful!");
    } catch (error) {
      toast.error(
        "Logout failed: " + (error.response?.data?.message || "Unknown error")
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const currentUserFull = createAsyncThunk(
  "user/currentFull",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;

    try {
      const { data } = await instance.get("/users/current/full", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        Array.isArray(data.noticesFavorites) &&
        data.noticesFavorites.length > 0
      ) {
        if (typeof data.noticesFavorites[0] === "string") {
          return {
            ...data,
            noticesFavorites: data.noticesFavorites,
          };
        } else {
          const favoritesIds = data.noticesFavorites.map(
            (notice) => notice._id
          );
          return {
            ...data,
            noticesFavorites: favoritesIds,
          };
        }
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;

    try {
      const { data } = await instance.patch("/users/current/edit", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPet = createAsyncThunk(
  "user/addPets",
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;

    try {
      const response = await instance.post(
        "/users/current/pets/add",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Pet added successfully!");
      return response.data;
    } catch (error) {
      toast.error(
        "Failed to add pet: " +
          (error.response?.data?.message || "Unknown error")
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePet = createAsyncThunk(
  "user/deletePets",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;

    try {
      await instance.delete(`/users/current/pets/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Pet deleted successfully!");
      return { _id: id };
    } catch (error) {
      toast.error(
        "Failed to delete pet: " +
          (error.response?.data?.message || "Unknown error")
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFavoriteNotice = createAsyncThunk(
  "user/addFavoriteNotice",
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;
    const favorites = state.user.user.noticesFavorites;

    if (favorites.some((notice) => notice._id === _id)) {
      toast.error("This notice is already in favorites", "error");
      return thunkAPI.rejectWithValue({
        message: "This notice is already in favorites",
      });
    }

    try {
      const response = await instance.post(
        `/notices/favorites/add/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteFavoriteNotice = createAsyncThunk(
  "user/deleteFavoriteNotice",
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;

    try {
      const response = await instance.delete(
        `/notices/favorites/remove/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addNoticeToViewed = createAsyncThunk(
  "user/addNoticeToViewed",
  async (notice, { getState }) => {
    const state = getState();
    const currentViewed = state.user.user.noticesViewed;
    const updatedViewed = [...currentViewed, notice];
    toast.success("Add viewed successfully!");
    return updatedViewed;
  }
);
