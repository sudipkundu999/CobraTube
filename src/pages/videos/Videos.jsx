import { useSelector, useDispatch } from "react-redux/es/exports";
import { Card } from "../../components/card/Card";
import { filterByCategory, filterByDate } from "../../features";
import { useDocumentTitle } from "../../utils";
import "./videos.css";

export const Videos = () => {
  const dispatch = useDispatch();
  useDocumentTitle("Videos");
  const { videosFromDB, categoriesFromDB, filterBy } = useSelector(
    (state) => state.video
  );

  const videosToShow = videosFromDB
    .filter((video) =>
      filterBy.category === "All"
        ? true
        : video.videoCategory === filterBy.category
    )
    .sort((a, b) => {
      const { day: aDD, month: aMM, year: aYYYY } = a.videoUploadedOn;
      const { day: bDD, month: bMM, year: bYYYY } = b.videoUploadedOn;
      const difference = new Date(aYYYY, aMM, aDD) - new Date(bYYYY, bMM, bDD);
      if (filterBy.date === "Oldest to newest") {
        return difference;
      } else if (filterBy.date === "Newest to Oldest") {
        return -difference;
      }
    });

  const categoryChips = ["All", ...categoriesFromDB];
  const dateChips = ["Newest to Oldest", "Oldest to newest"];

  return (
    <main className="videos-main">
      <div className="chips-container">
        {categoryChips.map((category) => (
          <div
            key={category}
            className={`category ${
              filterBy.category === category ? "category-active" : ""
            }`}
            onClick={(e) => dispatch(filterByCategory(e.target.innerText))}
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
            onClick={(e) => dispatch(filterByDate(e.target.innerText))}
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
