import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils";

const initialState = {
  isUserLoggedIn: false,
  userName: "Login",
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  userData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  isLoading: false,
};

export const login = createAsyncThunk("auth/login", async (_, thunkAPI) => {
  const { formData } = thunkAPI.getState().auth;
  try {
    const res = await axios.request({
      method: "post",
      url: "https://cobratube.herokuapp.com/auth/login",
      headers: { accept: "*/*" },
      data: { email: formData.email, password: formData.password },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const signup = createAsyncThunk("auth/signup", async (_, thunkAPI) => {
  const { formData } = thunkAPI.getState().auth;
  try {
    const res = await axios.request({
      method: "post",
      url: "https://cobratube.herokuapp.com/auth/signup",
      headers: { accept: "*/*" },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const loginAsGuest = createAsyncThunk(
  "auth/loginAsGuest",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "post",
        url: "https://cobratube.herokuapp.com/auth/login",
        headers: { accept: "*/*" },
        data: { email: "guest@cobratube.com", password: "cobratube" },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.request({
        method: "post",
        url: "https://cobratube.herokuapp.com/auth/verify",
        headers: {
          accept: "*/*",
        },
        data: { encodedToken: localStorage.getItem("cobraToken") },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFromData: (state, action) => {
      switch (action.payload.type) {
        case "firstName":
          state.formData.firstName = action.payload.value;
          break;
        case "lastName":
          state.formData.lastName = action.payload.value;
          break;
        case "email":
          state.formData.email = action.payload.value;
          break;
        case "password":
          state.formData.password = action.payload.value;
          break;
        default:
          break;
      }
    },
    logout: (state) => {
      state.userName = "Login";
      state.isUserLoggedIn = false;
      state.userData = initialState.userData;
      localStorage.removeItem("cobraToken");
      notifySuccess("Logged out successfully");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      const res = action.payload.foundUser;
      state.userName = res.firstName;
      state.isUserLoggedIn = true;
      state.userData = {
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: state.formData.password || "cobrastore",
      };
      state.formData = initialState.formData;
      notifySuccess("Login Successful");
      localStorage.setItem("cobraToken", action.payload.encodedToken);
    },
    [login.rejected]: (state) => {
      state.isLoading = false;
      notifyError("Invalid Email or Password");
    },
    [loginAsGuest.pending]: (state) => {
      state.isLoading = true;
    },
    [loginAsGuest.fulfilled]: (state, action) => {
      state.isLoading = false;
      const res = action.payload.foundUser;
      state.userName = res.firstName;
      state.isUserLoggedIn = true;
      state.userData = {
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: state.formData.password || "cobratube",
      };
      state.formData = initialState.formData;
      notifySuccess("Login Successful");
      localStorage.setItem("cobraToken", action.payload.encodedToken);
    },
    [loginAsGuest.rejected]: (state) => {
      state.isLoading = false;
      notifyError("Invalid Email or Password");
    },
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      const res = action.payload.createdUser;
      state.userName =
        state.formData.firstName.charAt(0).toUpperCase() +
        state.formData.firstName.slice(1);
      state.isUserLoggedIn = true;
      state.userData = {
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: res.password,
      };
      state.formData = initialState.formData;
      notifySuccess("Signup Successful");
      localStorage.setItem("cobraToken", action.payload.encodedToken);
    },
    [signup.rejected]: (state) => {
      state.isLoading = false;
      notifyError("Email Already Exists");
    },
    [verifyUser.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      const res = action.payload.foundUser;
      state.userName = res.firstName;
      state.isUserLoggedIn = true;
      state.userData = {
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: res.password,
      };
    },
    [verifyUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setFromData, logout } = authSlice.actions;

export default authSlice.reducer;
