
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





