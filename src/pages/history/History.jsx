import { useDocumentTitle } from "../../utils";
import "./history.css";

export const History = () => {
  useDocumentTitle("History");

  return <main className="history-main">This is History page</main>;
};
