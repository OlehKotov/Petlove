
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
      const {data} = await instance.post("/users/signup", userData);
      setToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const {data} = await instance.post("/users/signin", userData); 
      setToken(data.token);  
      return data;
    } catch (error) {
      return rejectWithValue(error.data);
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
        throw new Error("No token found");
      }
      setToken(token); 
      await instance.post('/users/signout');
      clearToken(); 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
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
      return data;
    } catch (e) {
      console.error('Login error:', e.response.data);
      return thunkAPI.rejectWithValue(e.message);
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
    } catch (e) {
      console.error('Login error:', e.response.data);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addPet = createAsyncThunk(
  "user/addPets",
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token; 

    try {
      const response = await instance.post("/users/current/pets/add", userData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (e) {
      console.error('Login error:', e.response.data);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deletePet = createAsyncThunk(
  "user/deletePets",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token; 

    try {
      const response = await instance.delete(`/users/current/pets/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return { _id: id };
    } catch (e) {
      console.error('Login error:', e.response.data);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const addFavoriteNotice = createAsyncThunk(
  "user/addFavoriteNotice",
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;
    const favorites = state.user.user.noticesFavorites; 

    // if (favorites.includes(_id)) {
    //   return thunkAPI.rejectWithValue({ message: "This notice is already in favorites" });
    // }

    if (favorites.some((notice) => notice._id === _id)) {
      return thunkAPI.rejectWithValue({ message: "This notice is already in favorites" });
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
      console.log('Add favorite response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding favorite notice:', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteFavoriteNotice = createAsyncThunk(
  "user/deleteFavoriteNotice",
  async (_id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.user.token;
    // const favorites = state.user.user.noticesFavorites; 

    // if (!favorites.includes(_id)) {
    //   return thunkAPI.rejectWithValue({ message: "This notice is not in favorites" });
    // }

    try {
      const response = await instance.delete(
        `/notices/favorites/remove/${_id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Delete favorite response:', response.data); 
      // return { _id };
      return response.data;
    } catch (error) {
      console.error('Error deleting favorite notice:', error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);




