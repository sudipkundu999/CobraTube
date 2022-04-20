import { useDocumentTitle } from "../../utils";
import "./watch-later.css";

export const WatchLater = () => {
  useDocumentTitle("Watch Later");

  return <main className="watchlater-main">This is WatchLater page</main>;
};
