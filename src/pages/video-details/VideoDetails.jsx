import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  IcBaselinePlaylistAdd,
  LikeBtn,
  LikeBtnFilled,
  MdiShare,
  WatchLaterIcon,
} from "../../assets/icons/Icons";
import { Card } from "../../components/card/Card";
import { useAuth, usePlaylist, useVideos, useWatchlater } from "../../contexts";
import { notifyDefault, notifySuccess } from "../../utils";
import "./video-details.css";

import { useDispatch, useSelector } from "react-redux";
import { addToHistory, addToLike, removeFromLike } from "../../features";

export const VideoDetails = () => {
  const dispatch = useDispatch();
  const { videosId } = useParams();
  const { videosFromDB } = useVideos();
  const video = videosFromDB.find((ele) => ele._id === videosId);
  useEffect(() => {
    dispatch(addToHistory(video));
  }, []);

  const { watchlaterToShow, addToWatchlater, removeFromWatchlater } =
    useWatchlater();
  const isInWatchLater = watchlaterToShow.findIndex(
    (ele) => ele._id === video._id
  );

  const { likesToShow } = useSelector((state) => state.like);
  const isLikedVideo = likesToShow.findIndex((ele) => ele._id === video._id);

  const { setIsPopupVisible, setSelectedVideo } = usePlaylist();

  const navigate = useNavigate();
  const location = useLocation();
  const { isUserLoggedIn } = useAuth();
  const notLoggedInHandler = () => {
    navigate("/login", {
      state: { from: location },
      replace: true,
    });
    notifyDefault("Please Login to continue");
  };

  const moreVideos = videosFromDB.filter((video) => video._id !== videosId);
  const [moreVideosToShow, setMoreVideosToShow] = useState(
    moreVideos.slice(0, 4)
  );
  //This function mocks an API call to load more data on infinite scroll
  const fetchMoreData = () => {
    setTimeout(() => {
      const length = moreVideosToShow.length;
      setMoreVideosToShow((prev) => [...prev, moreVideos[length]]);
    }, 500);
  };

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
                    <LikeBtnFilled
                      onClick={() => dispatch(removeFromLike(video))}
                    />
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
                <div>
                  {isInWatchLater !== -1 ? (
                    <div
                      className="cta-watchlater-remove"
                      onClick={() => removeFromWatchlater(video)}
                    >
                      <WatchLaterIcon />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        isUserLoggedIn
                          ? addToWatchlater(video)
                          : notLoggedInHandler()
                      }
                    >
                      <WatchLaterIcon />
                    </div>
                  )}
                </div>
                <div
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
      <div id="more-videos-wrapper">
        <div className="more-videos-heading">More Videos</div>
        <InfiniteScroll
          className="infinite-scroll"
          dataLength={moreVideosToShow.length}
          next={() => fetchMoreData()}
          hasMore={moreVideosToShow.length !== moreVideos.length}
          loader={<h4 className="scroll-message">Loading...</h4>}
          endMessage={<h4 className="scroll-message">No more videos in DB</h4>}
          scrollableTarget="more-videos-wrapper"
        >
          {moreVideosToShow.map((video) => (
            <Card video={video} key={video._id} />
          ))}
        </InfiniteScroll>
      </div>
    </main>
  );
};
