import "./card.css";
import {
  IcBaselinePlaylistAdd,
  LikeBtn,
  LikeBtnFilled,
  MdiDotsVertical,
  WatchLaterIcon,
} from "../../assets/icons/Icons";
import { useLike } from "../../contexts/like-context";
import { useWatchlater } from "../../contexts";
import { useState } from "react";

export const Card = ({ video }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { watchlaterToShow, addToWatchlater, removeFromWatchlater } =
    useWatchlater();
  const isInWatchLater = watchlaterToShow.findIndex(
    (ele) => ele._id === video._id
  );

  const { likesToShow, addToLike, removeFromLike } = useLike();
  const isLikedVideo = likesToShow.findIndex((ele) => ele._id === video._id);

  return (
    <div className="video-card">
      <img
        className="img-fluid video-thumbnail-image"
        src={`https://i.ytimg.com/vi/${video._id}/hqdefault.jpg`}
        alt={video.videoTitle}
      />
      <div className="video-info">
        <img
          className="creator-thumbnail-image"
          src={video.creatorThumbnail}
          alt={video.creatorName}
        />
        <div className="name-wrapper">
          <div className="video-title">{video.videoTitle}</div>
          <div className="creator-name">{video.creatorName}</div>
        </div>
        <div
          className="card-menu-btn"
          onMouseEnter={() => setIsMenuVisible(true)}
          onMouseLeave={() => setIsMenuVisible(false)}
        >
          <MdiDotsVertical />
        </div>
        <div className="video-length">{video.videoLength}</div>
        <div className="like-btn">
          {isLikedVideo !== -1 ? (
            <LikeBtnFilled onClick={() => removeFromLike(video)} />
          ) : (
            <LikeBtn onClick={() => addToLike(video)} />
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
                onClick={() => addToWatchlater(video)}
              >
                <WatchLaterIcon />
                Add to Watch Later
              </div>
            )}
          </div>
          <div className="playlist">
            <IcBaselinePlaylistAdd />
            "Save to Playlist"
          </div>
        </div>
      )}
    </div>
  );
};
