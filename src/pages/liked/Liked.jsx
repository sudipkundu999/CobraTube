import { useDocumentTitle } from "../../utils";
import "./liked.css";

export const Liked = () => {
  useDocumentTitle("Liked");

  return <main className="liked-main">This is Liked page</main>;
};
