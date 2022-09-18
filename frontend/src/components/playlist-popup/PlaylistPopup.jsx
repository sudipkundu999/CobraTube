import { useDispatch, useSelector } from "react-redux";
import { IcBaselineClose } from "../../assets/icons/Icons";
import {
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  setIsPopupVisible,
} from "../../features";
import { InputFields } from "./InputFields";
import "./playlist-popup.css";

export const PlaylistPopup = () => {
  const dispatch = useDispatch();
  const {
    playlistToShow,
    isPopupVisible,
    selectedVideo: video,
  } = useSelector((state) => state.playlist);

  return (
    <div
      className={`playlist-popup-container ${
        isPopupVisible ? "popup-visible" : ""
      }`}
      onClick={() => dispatch(setIsPopupVisible(false))}
    >
      <div className="playlist-popup" onClick={(e) => e.stopPropagation()}>
        <div
          className="playlist-popup-close-btn"
          onClick={() => dispatch(setIsPopupVisible(false))}
        >
          <IcBaselineClose />
        </div>
        <div className="heading">Save to...</div>
        <div className="playlist-list">
          {playlistToShow.map((playlist, index) => (
            <label className="playlist-list-item" key={index}>
              <input
                type="checkbox"
                checked={playlist.videos.some(
                  (item) => item._id === video?._id
                )}
                onChange={(e) =>
                  !e.target.checked
                    ? dispatch(
                        deleteVideoFromPlaylist({
                          playlist: playlist,
                          video: video,
                        })
                      )
                    : dispatch(
                        addVideoToPlaylist({
                          playlist: playlist,
                          video: video,
                        })
                      )
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
