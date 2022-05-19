import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyError } from "../../utils";
import axios from "axios";

const initialState = {
  playlistToShow: [],
  isPopupVisible: false,
  selectedVideo: undefined,
  isLoading: false,
};

export const fetchAllPlaylists = createAsyncThunk(
  "playlist/fetchAllPlaylists",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "get",
        url: "/api/user/playlists",
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addPlaylist = createAsyncThunk(
  "playlist/addToPlaylist",
  async (args, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: "/api/user/playlists",
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {
          playlist: { title: args.title, description: args.description || "" },
        },
      });
      return res.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "playlist/deletePlaylist",
  async (playlist, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: `/api/user/playlists/${playlist._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideoToPlaylist",
  async (args, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: `/api/user/playlists/${args.playlist._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: { video: args.video },
      });
      return res.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const deleteVideoFromPlaylist = createAsyncThunk(
  "playlist/deleteVideoFromPlaylist",
  async (args, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: `/api/user/playlists/${args.playlist._id}/${args.video._id}`,
        headers: {
          accept: "*/*",
          authorization: localStorage.getItem("cobraToken"),
        },
        data: {},
      });
      return res.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
    setIsPopupVisible: (state, action) => {
      state.isPopupVisible = action.payload;
    },
  },
  extraReducers: {
    [fetchAllPlaylists.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllPlaylists.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.playlistToShow = action.payload;
    },
    [fetchAllPlaylists.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [addPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [addPlaylist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.playlistToShow = action.payload;
    },
    [addPlaylist.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [deletePlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePlaylist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.playlistToShow = action.payload;
    },
    [deletePlaylist.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [addVideoToPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [addVideoToPlaylist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.playlistToShow = action.payload;
    },
    [addVideoToPlaylist.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
    [deleteVideoFromPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteVideoFromPlaylist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.playlistToShow = action.payload;
    },
    [deleteVideoFromPlaylist.rejected]: (state, action) => {
      notifyError(action.payload);
      state.isLoading = false;
    },
  },
});

export const { setSelectedVideo, setIsPopupVisible } = playlistSlice.actions;

export default playlistSlice.reducer;
