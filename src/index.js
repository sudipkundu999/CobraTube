import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import {
  AuthProvider,
  PlaylistProvider,
  VideoProvider,
  WatchlaterProvider,
} from "./contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <VideoProvider>
            <WatchlaterProvider>
              <PlaylistProvider>
                <App />
              </PlaylistProvider>
            </WatchlaterProvider>
          </VideoProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
