import { useSelector, useDispatch } from "react-redux";
import { Card } from "../../components/card/Card";
import { removeAllFromHistory } from "../../features";
import { useDocumentTitle } from "../../utils";
import "./history.css";

export const History = () => {
  useDocumentTitle("History");
  const dispatch = useDispatch();
  const { historyToShow } = useSelector((state) => state.history);

  return (
    <main className="history-main">
      <div className="heading">Watch History</div>
      {historyToShow.length !== 0 && (
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(removeAllFromHistory())}
        >
          Clear History
        </button>
      )}
      <div className="videos-display-wrapper">
        {historyToShow.length === 0
          ? "You haven't seen any videos yet!"
          : historyToShow.map((video) => (
              <Card video={video} key={video._id} />
            ))}
      </div>
    </main>
  );
};
