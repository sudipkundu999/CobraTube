import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./features/like/likeSlice";
import historyReducer from "./features/history/historySlice";

export const store = configureStore({
  reducer: {
    like: likeReducer,
    history: historyReducer,
  },
});
