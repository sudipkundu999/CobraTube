import { Card } from "../../components/card/Card";
import { useWatchlater } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import "./watch-later.css";

export const WatchLater = () => {
  useDocumentTitle("Watch Later");
  const { watchlaterToShow } = useWatchlater();

  return (
    <main className="watchlater-main">
      <div className="videos-display-wrapper">
        {watchlaterToShow.length === 0
          ? "You haven't added any videos to watch later!"
          : watchlaterToShow.map((video) => (
              <Card video={video} key={video._id} />
            ))}
      </div>
    </main>
  );
};
