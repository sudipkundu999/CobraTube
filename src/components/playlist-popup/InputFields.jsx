import { useState } from "react";
import { usePlaylist } from "../../contexts";

export const InputFields = ({
  setIsInputVisible,
  fromPlaylistPage = false,
}) => {
  const [newPlaylistInput, setNewPlaylistInput] = useState({
    name: "",
    description: "",
  });

  const { addPlaylist } = usePlaylist();

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
            addPlaylist(newPlaylistInput.name, newPlaylistInput.description);
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
