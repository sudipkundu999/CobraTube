import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyError } from "../../utils";
import axios from "axios";

const initialState = {
  historyToShow: [],
  isLoading: false,
};

export const fetchHistory = createAsyncThunk(
  "history/getHistory",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "get",
        url: "https://cobratube.cyclic.app/history",
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.history;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addToHistory = createAsyncThunk(
  "history/addToHistory",
  async (video, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: `https://cobratube.cyclic.app/history/${video._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.history;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const removeFromHistory = createAsyncThunk(
  "history/removeFromHistory",
  async (video, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: `https://cobratube.cyclic.app/history/${video._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.history;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const removeAllFromHistory = createAsyncThunk(
  "history/removeAllFromHistory",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: "https://cobratube.cyclic.app/history/",
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.history;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetHistory: (state) => {
      state.historyToShow = [];
    },
  },
  extraReducers: {
    [fetchHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchHistory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.historyToShow = action.payload;
    },
    [fetchHistory.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [addToHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [addToHistory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.historyToShow = action.payload;
    },
    [addToHistory.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [removeFromHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFromHistory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.historyToShow = action.payload;
    },
    [removeFromHistory.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [removeAllFromHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [removeAllFromHistory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.historyToShow = action.payload;
    },
    [removeAllFromHistory.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
  },
});

export const { resetHistory } = historySlice.actions;

export default historySlice.reducer;
