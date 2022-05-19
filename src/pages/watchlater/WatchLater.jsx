import { useSelector } from "react-redux/es/exports";
import { Card } from "../../components/card/Card";
import { useDocumentTitle } from "../../utils";
import "./watch-later.css";

export const WatchLater = () => {
  useDocumentTitle("Watch Later");
  const { watchlaterToShow } = useSelector((state) => state.watchlater);

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
