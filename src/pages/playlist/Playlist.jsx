import "./playlist.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../utils";
import { Card } from "../../components/card/Card";
import { MdiTrashCan } from "../../assets/icons/Icons";
import { usePlaylist } from "../../contexts/playlist-context";
import { InputFields } from "../../components/playlist-popup/InputFields";

export const Playlist = () => {
  useDocumentTitle("Playlist");

  const { playlistToShow, deletePlaylist } = usePlaylist();
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
              <MdiTrashCan onClick={() => deletePlaylist(playlist)} />
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
