import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyError } from "../../utils";
import axios from "axios";

const initialState = {
  videosFromDB: [],
  isVideoLoading: false,
  categoriesFromDB: [],
  isCategoryLoading: false,
  filterBy: { category: "All", date: "" },
};

export const fetchVideos = createAsyncThunk(
  "video/getVideos",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "get",
        url: "https://cobratube.herokuapp.com/videos",
      });
      return res.data.videos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "video/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "get",
        url: "https://cobratube.herokuapp.com/categories",
      });
      return res.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.filterBy.category = action.payload;
    },
    filterByDate: (state, action) => {
      state.filterBy.date = action.payload;
    },
  },
  extraReducers: {
    [fetchVideos.pending]: (state) => {
      state.isVideoLoading = true;
    },
    [fetchVideos.fulfilled]: (state, action) => {
      state.isVideoLoading = false;
      state.videosFromDB = action.payload;
    },
    [fetchVideos.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isVideoLoading = false;
    },
    [fetchCategories.pending]: (state) => {
      state.isCategoryLoading = true;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.isCategoryLoading = false;
      state.categoriesFromDB = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isCategoryLoading = false;
    },
  },
});

export const { filterByCategory, filterByDate } = videoSlice.actions;

export default videoSlice.reducer;
