import "./card.css";
import {
  IcBaselinePlaylistAdd,
  LikeBtn,
  LikeBtnFilled,
  MdiDotsVertical,
  MdiTrashCan,
  WatchLaterIcon,
} from "../../assets/icons/Icons";
import {
  useAuth,
  useHistory,
  usePlaylist,
  useWatchlater,
} from "../../contexts";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notifyDefault } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { addToLike, removeFromLike } from "../../features/like/likeSlice";

export const Card = ({ video }) => {
  const dispatch = useDispatch();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { watchlaterToShow, addToWatchlater, removeFromWatchlater } =
    useWatchlater();
  const isInWatchLater = watchlaterToShow.findIndex(
    (ele) => ele._id === video._id
  );

  const { likesToShow } = useSelector((state) => state.like);
  const isLikedVideo = likesToShow.findIndex((ele) => ele._id === video._id);

  const { removeFromHistory } = useHistory();
  const navigate = useNavigate();

  const location = useLocation();

  const { setIsPopupVisible, setSelectedVideo } = usePlaylist();

  const { isUserLoggedIn } = useAuth();
  const notLoggedInHandler = () => {
    navigate("/login", {
      state: { from: location },
      replace: true,
    });
    notifyDefault("Please Login to continue");
  };

  return (
    <div className="video-card">
      <img
        className="img-fluid video-thumbnail-image"
        src={`https://i.ytimg.com/vi/${video._id}/hqdefault.jpg`}
        alt={video.videoTitle}
        onClick={() => navigate(`/videos/${video._id}`)}
      />
      <div className="video-info">
        <img
          className="creator-thumbnail-image"
          src={video.creatorThumbnail}
          alt={video.creatorName}
        />
        <div className="name-wrapper">
          <div
            className="video-title"
            onClick={() => navigate(`/videos/${video._id}`)}
          >
            {video.videoTitle}
          </div>
          <div className="creator-name">{video.creatorName}</div>
        </div>
        {location.pathname === "/history" ? (
          <div className="remove-from-history-btn">
            <MdiTrashCan onClick={() => removeFromHistory(video)} />
          </div>
        ) : (
          <div
            className="card-menu-btn"
            onMouseEnter={() => setIsMenuVisible(true)}
            onMouseLeave={() => setIsMenuVisible(false)}
          >
            <MdiDotsVertical />
          </div>
        )}
        <div className="video-length">{video.videoLength}</div>
        <div className="like-btn">
          {isLikedVideo !== -1 ? (
            <LikeBtnFilled onClick={() => dispatch(removeFromLike(video))} />
          ) : (
            <LikeBtn
              onClick={() =>
                isUserLoggedIn
                  ? dispatch(addToLike(video))
                  : notLoggedInHandler()
              }
            />
          )}
        </div>
      </div>

      {isMenuVisible && (
        <div
          className="card-menu"
          onMouseEnter={() => setIsMenuVisible(true)}
          onMouseLeave={() => setIsMenuVisible(false)}
        >
          <div className="watch-later">
            {isInWatchLater !== -1 ? (
              <div
                className="watch-later-remove"
                onClick={() => removeFromWatchlater(video)}
              >
                <WatchLaterIcon />
                Remove from Watch Later
              </div>
            ) : (
              <div
                className="watch-later-add"
                onClick={() =>
                  isUserLoggedIn ? addToWatchlater(video) : notLoggedInHandler()
                }
              >
                <WatchLaterIcon />
                Add to Watch Later
              </div>
            )}
          </div>
          <div
            className="playlist"
            onClick={() => {
              if (isUserLoggedIn) {
                setIsPopupVisible(true);
                setSelectedVideo(video);
              } else {
                notLoggedInHandler();
              }
            }}
          >
            <IcBaselinePlaylistAdd />
            Save to Playlist
          </div>
        </div>
      )}
    </div>
  );
};
