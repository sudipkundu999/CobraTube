import { IcBaselineClose } from "../../assets/icons/Icons";
import { usePlaylist } from "../../contexts";
import { InputFields } from "./InputFields";
import "./playlist-popup.css";

export const PlaylistPopup = () => {
  const {
    playlistToShow,
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
    isPopupVisible,
    setIsPopupVisible,
    selectedVideo: video,
  } = usePlaylist();

  return (
    <div
      className={`playlist-popup-container ${
        isPopupVisible ? "popup-visible" : ""
      }`}
      onClick={() => setIsPopupVisible(false)}
    >
      <div className="playlist-popup" onClick={(e) => e.stopPropagation()}>
        <div
          className="playlist-popup-close-btn"
          onClick={() => setIsPopupVisible(false)}
        >
          <IcBaselineClose />
        </div>
        <div className="heading">Save to...</div>
        <div className="playlist-list">
          {playlistToShow.map((playlist, index) => (
            <label className="playlist-list-item" key={index}>
              <input
                type="checkbox"
                checked={playlist.videos.some((item) => item._id === video._id)}
                onChange={(e) =>
                  !e.target.checked
                    ? deleteVideoFromPlaylist(playlist, video)
                    : addVideoToPlaylist(playlist, video)
                }
              />
              {playlist.title}
            </label>
          ))}
        </div>
        <InputFields />
      </div>
    </div>
  );
};
