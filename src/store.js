import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./features/like/likeSlice";
import historyReducer from "./features/history/historySlice";
import watchlaterReducer from "./features/watchlater/watchlaterSlice";
import videoReducer from "./features/video/videoSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    like: likeReducer,
    history: historyReducer,
    watchlater: watchlaterReducer,
    video: videoReducer,
    auth: authReducer,
  },
});
