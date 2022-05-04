import { useParams } from "react-router-dom";
import {
  IcBaselinePlaylistAdd,
  LikeBtn,
  LikeBtnFilled,
  MdiShare,
  WatchLaterIcon,
} from "../../assets/icons/Icons";
import { useLike, usePlaylist, useVideos, useWatchlater } from "../../contexts";
import { notifySuccess } from "../../utils";
import "./video-details.css";

export const VideoDetails = () => {
  const { videosId } = useParams();
  const { videosFromDB } = useVideos();
  const video = videosFromDB.find((ele) => ele._id === videosId);

  const { watchlaterToShow, addToWatchlater, removeFromWatchlater } =
    useWatchlater();
  const isInWatchLater = watchlaterToShow.findIndex(
    (ele) => ele._id === video._id
  );

  const { likesToShow, addToLike, removeFromLike } = useLike();
  const isLikedVideo = likesToShow.findIndex((ele) => ele._id === video._id);

  const { setIsPopupVisible, setSelectedVideo } = usePlaylist();

  return (
    <main className="video-details-main">
      <div className="iframe-max-width">
        <div className="iframe-wrapper">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videosId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {video && (
          <div className="video-description-wrapper">
            <div className="video-description-title">{video.videoTitle}</div>
            <div className="video-description-creator-name">
              By {video.creatorName}
              <div className="video-description-cta">
                <div>
                  <MdiShare
                    onClick={() => {
                      navigator.clipboard
                        .writeText(window.location.href)
                        .then(() => notifySuccess("Copied to Clipboard"));
                    }}
                  />
                </div>
                <div>
                  {isLikedVideo !== -1 ? (
                    <LikeBtnFilled onClick={() => removeFromLike(video)} />
                  ) : (
                    <LikeBtn onClick={() => addToLike(video)} />
                  )}
                </div>
                <div>
                  {isInWatchLater !== -1 ? (
                    <div
                      className="cta-watchlater-remove"
                      onClick={() => removeFromWatchlater(video)}
                    >
                      <WatchLaterIcon />
                    </div>
                  ) : (
                    <div onClick={() => addToWatchlater(video)}>
                      <WatchLaterIcon />
                    </div>
                  )}
                </div>
                <div
                  onClick={() => {
                    setIsPopupVisible(true);
                    setSelectedVideo(video);
                  }}
                >
                  <IcBaselinePlaylistAdd />
                </div>
              </div>
              <div className="video-description-views">
                {video.videoViews} views
              </div>
            </div>
            <div className="video-description">{video.videoDescription}</div>
          </div>
        )}
      </div>
    </main>
  );
};
