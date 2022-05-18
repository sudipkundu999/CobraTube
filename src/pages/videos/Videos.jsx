import { Card } from "../../components/card/Card";
import { useVideos } from "../../contexts/video-context";
import { useDocumentTitle } from "../../utils";
import "./videos.css";

export const Videos = () => {
  useDocumentTitle("Videos");
  const { videosToShow, categoriesFromDB, setFilterBy, filterBy } = useVideos();
  const categoryChips = ["All", ...categoriesFromDB];
  const dateChips = ["Newest to Oldest", "Oldest to newest"];

  return (
    <main className="videos-main">
      <div className="chips-container">
        {categoryChips.map((category) => (
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
        {dateChips.map((sortByDateChip) => (
          <div
            key={sortByDateChip}
            className={`category ${
              filterBy.date === sortByDateChip ? "category-active" : ""
            }`}
            onClick={(e) =>
              setFilterBy((prev) => ({ ...prev, date: e.target.innerText }))
            }
          >
            {sortByDateChip}
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
