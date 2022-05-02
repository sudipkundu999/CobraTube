import { Card } from "../../components/card/Card";
import { useHistory } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import "./history.css";

export const History = () => {
  useDocumentTitle("History");
  const { historyToShow, removeAllFromHistory } = useHistory();

  return (
    <main className="history-main">
      {historyToShow.length !== 0 && (
        <button
          className="btn btn-secondary"
          onClick={() => removeAllFromHistory()}
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
