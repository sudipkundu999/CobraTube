import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist, addVideoToPlaylist } from "../../features";

export const InputFields = ({
  setIsInputVisible,
  fromPlaylistPage = false,
}) => {
  const [newPlaylistInput, setNewPlaylistInput] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { selectedVideo, playlistToShow } = useSelector(
    (state) => state.playlist
  );

  useEffect(() => {
    if (selectedVideo) {
      const newPlaylist = playlistToShow[playlistToShow.length - 1];
      dispatch(
        addVideoToPlaylist({
          playlist: newPlaylist,
          video: selectedVideo,
        })
      );
    }
  }, [playlistToShow.length]);

  return (
    <div className="create-playlist-input">
      <input
        type="text"
        placeholder="Enter Name*"
        value={newPlaylistInput.name}
        onChange={(e) =>
          setNewPlaylistInput((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={newPlaylistInput.description}
        onChange={(e) =>
          setNewPlaylistInput((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <button
        className="btn btn-secondary"
        onClick={() => {
          if (newPlaylistInput.name.trim()) {
            dispatch(
              addPlaylist({
                title: newPlaylistInput.name,
                description: newPlaylistInput.description,
              })
            );
            if (fromPlaylistPage) {
              setIsInputVisible(false);
            }
          }
          setNewPlaylistInput({
            name: "",
            description: "",
          });
        }}
      >
        Create New Playlist
      </button>
    </div>
  );
};
