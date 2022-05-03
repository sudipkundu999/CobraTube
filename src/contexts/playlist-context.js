import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../utils";
import { useAuth } from "./auth-context";

const PlaylistContext = createContext();

const usePlaylist = () => useContext(PlaylistContext);

const PlaylistProvider = ({ children }) => {
  const [playlistToShow, setPlaylistToShow] = useState([]);
  const {
    response: responsePlaylist,
    loading: loadingPlaylist,
    operation: operationPlaylist,
  } = useAxios();

  const fetchAllPlaylists = () => {
    operationPlaylist({
      method: "get",
      url: "/api/user/playlists",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  const { isUserLoggedIn } = useAuth();
  useEffect(() => {
    isUserLoggedIn ? fetchAllPlaylists() : setPlaylistToShow([]);
  }, [isUserLoggedIn]);

  const addPlaylist = (title, description = "") => {
    operationPlaylist({
      method: "POST",
      url: "/api/user/playlists",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: { playlist: { title: title, description: description } },
    });
  };

  const deletePlaylist = (playlist) => {
    operationPlaylist({
      method: "DELETE",
      url: `/api/user/playlists/${playlist._id}`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  //Not used yet. CAUTION : returns playlist Not playlists
  const fetchSinglePlaylist = (playlist) => {
    operationPlaylist({
      method: "get",
      url: `/api/user/playlists/${playlist._id}`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  const addVideoToPlaylist = (playlist, video) => {
    operationPlaylist({
      method: "POST",
      url: `/api/user/playlists/${playlist._id}`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: { video: video },
    });
  };

  const deleteVideoFromPlaylist = (playlist, video) => {
    operationPlaylist({
      method: "DELETE",
      url: `/api/user/playlists/${playlist._id}/${video._id}`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  useEffect(
    () =>
      responsePlaylist !== undefined &&
      setPlaylistToShow(responsePlaylist.playlists),
    [responsePlaylist]
  );

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();

  return (
    <PlaylistContext.Provider
      value={{
        loadingPlaylist,
        playlistToShow,
        fetchAllPlaylists,
        addPlaylist,
        deletePlaylist,
        fetchSinglePlaylist,
        addVideoToPlaylist,
        deleteVideoFromPlaylist,
        isPopupVisible,
        setIsPopupVisible,
        selectedVideo,
        setSelectedVideo,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export { usePlaylist, PlaylistProvider };
