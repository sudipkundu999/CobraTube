import "./playlist.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../utils";
import { Card } from "../../components/card/Card";
import { MdiTrashCan } from "../../assets/icons/Icons";
import { InputFields } from "../../components/playlist-popup/InputFields";
import { deletePlaylist } from "../../features";

export const Playlist = () => {
  useDocumentTitle("Playlist");
  const dispatch = useDispatch();

  const { playlistToShow } = useSelector((state) => state.playlist);
  const [isInputVisible, setIsInputVisible] = useState(false);

  return (
    <main className="playlist-main">
      {isInputVisible && (
        <InputFields
          fromPlaylistPage={true}
          setIsInputVisible={setIsInputVisible}
        />
      )}
      {!isInputVisible && (
        <button
          className="btn btn-secondary"
          onClick={() => setIsInputVisible(true)}
        >
          Add New Playlist
        </button>
      )}
      {playlistToShow.map((playlist, index) => (
        <div className="playlist-wrapper" key={index}>
          <div className="playlist-name">
            {playlist.title}
            <div className="delete-playlist-btn">
              <MdiTrashCan onClick={() => dispatch(deletePlaylist(playlist))} />
            </div>
          </div>
          <div className="videos-display-wrapper">
            {playlist.videos.length !== 0 ? (
              playlist.videos.map((video, i) => <Card video={video} key={i} />)
            ) : (
              <div className="empty-playlist-text">
                Add videos from <Link to="/videos">here</Link>!
              </div>
            )}
          </div>
        </div>
      ))}
    </main>
  );
};
