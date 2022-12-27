import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyError } from "../../utils";
import axios from "axios";

const initialState = {
  likesToShow: [],
  isLoading: false,
};

export const fetchLike = createAsyncThunk(
  "like/getLike",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "get",
        url: "https://cobratube.cyclic.app/likes",
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.likes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addToLike = createAsyncThunk(
  "like/addToLike",
  async (video, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: `https://cobratube.cyclic.app/likes/${video._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.likes;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const removeFromLike = createAsyncThunk(
  "like/removeFromLike",
  async (video, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: `https://cobratube.cyclic.app/likes/${video._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.likes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    resetLike: (state) => {
      state.likesToShow = [];
    },
  },
  extraReducers: {
    [fetchLike.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.likesToShow = action.payload;
    },
    [fetchLike.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [addToLike.pending]: (state) => {
      state.isLoading = true;
    },
    [addToLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.likesToShow = action.payload;
    },
    [addToLike.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [removeFromLike.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFromLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.likesToShow = action.payload;
    },
    [removeFromLike.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
  },
});

export const { resetLike } = likeSlice.actions;

export default likeSlice.reducer;
