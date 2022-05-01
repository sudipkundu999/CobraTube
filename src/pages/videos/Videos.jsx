import { Card } from "../../components/card/Card";
import { useVideos } from "../../contexts/video-context";
import { useDocumentTitle } from "../../utils";
import "./videos.css";

export const Videos = () => {
  useDocumentTitle("Videos");
  const { videosToShow, categoriesFromDB, setFilterBy, filterBy } = useVideos();
  const chips = ["All", ...categoriesFromDB];

  return (
    <main className="videos-main">
      <div className="chips-container">
        {chips.map((category) => (
          <div
            key={category}
            className={`category ${
              filterBy.chips === category ? "category-active" : ""
            }`}
            onClick={(e) =>
              setFilterBy((prev) => ({ ...prev, chips: e.target.innerText }))
            }
          >
            {category}
          </div>
        ))}
      </div>
      <div className="videos-display-wrapper">
        {videosToShow.map((video) => (
          <Card video={video} key={video._id} />
        ))}
      </div>
    </main>
  );
};
