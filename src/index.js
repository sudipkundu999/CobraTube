import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  HistoryProvider,
  LikeProvider,
  PlaylistProvider,
  VideoProvider,
  WatchlaterProvider,
} from "./contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <LikeProvider>
            <WatchlaterProvider>
              <HistoryProvider>
                <PlaylistProvider>
                  <App />
                </PlaylistProvider>
              </HistoryProvider>
            </WatchlaterProvider>
          </LikeProvider>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
