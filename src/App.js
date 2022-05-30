import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.css";
import {
  Sidebar,
  Header,
  AuthRoutes,
  RequiresAuth,
  PlaylistPopup,
} from "./components";
import {
  History,
  Liked,
  Login,
  Page404,
  Playlist,
  Signup,
  User,
  VideoDetails,
  Videos,
  WatchLater,
} from "./pages";

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <PlaylistPopup />
      <ToastContainer theme="dark" />

      <div className="app">
        <Routes>
          <Route path="/" element={<Videos />} />
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<RequiresAuth />}>
            <Route path="/user" element={<User />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/watchlater" element={<WatchLater />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/history" element={<History />} />
          </Route>
          <Route path="/:videosId" element={<VideoDetails />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
