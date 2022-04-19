import { Route, Routes } from "react-router-dom";
import { Sidebar, Header } from "./components";
import {
  History,
  Homepage,
  Liked,
  Playlist,
  Videos,
  WatchLater,
} from "./pages";

function App() {
  return (
    <div>
      <Header />
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route> */}
          {/* <Route element={<RequiresAuth />}> */}
          <Route path="/liked" element={<Liked />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/history" element={<History />} />
          {/* </Route> */}
          <Route path="/videos" element={<Videos />} />
          {/* <Route path="/videos/:videosId" element={<VideoDetails />} /> */}
          {/* <Route path="/mock" element={<Mock />} /> */}
          {/* <Route path="*" element={<Page404 />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
