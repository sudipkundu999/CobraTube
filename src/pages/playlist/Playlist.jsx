import { useDocumentTitle } from "../../utils";
import "./playlist.css";

export const Playlist = () => {
  useDocumentTitle("Playlist");

  return <main className="playlist-main">This is Playlist page</main>;
};
