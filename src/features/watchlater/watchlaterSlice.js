import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyError } from "../../utils";
import axios from "axios";

const initialState = {
  watchlaterToShow: [],
  isLoading: false,
};

export const fetchWatchlater = createAsyncThunk(
  "watchlater/getWatchlater",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "get",
        url: "/api/user/watchlater",
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.watchlater;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addToWatchlater = createAsyncThunk(
  "watchlater/addToWatchlater",
  async (video, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: "/api/user/watchlater",
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: { video: video },
      });
      return res.data.watchlater;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const removeFromWatchlater = createAsyncThunk(
  "watchlater/removeFromWatchlater",
  async (video, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: `/api/user/watchlater/${video._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.watchlater;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const watchlaterSlice = createSlice({
  name: "watchlater",
  initialState,
  reducers: {
    resetWatchlater: (state) => {
      state.watchlaterToShow = [];
    },
  },
  extraReducers: {
    [fetchWatchlater.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchWatchlater.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.watchlaterToShow = action.payload;
    },
    [fetchWatchlater.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [addToWatchlater.pending]: (state) => {
      state.isLoading = true;
    },
    [addToWatchlater.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.watchlaterToShow = action.payload;
    },
    [addToWatchlater.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [removeFromWatchlater.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFromWatchlater.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.watchlaterToShow = action.payload;
    },
    [removeFromWatchlater.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
  },
});

export const { resetWatchlater } = watchlaterSlice.actions;

export default watchlaterSlice.reducer;
