import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./features/like/likeSlice";

export const store = configureStore({
  reducer: {
    like: likeReducer,
  },
});
