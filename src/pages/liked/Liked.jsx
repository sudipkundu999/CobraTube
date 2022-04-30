import { Card } from "../../components/card/Card";
import { useLike } from "../../contexts/like-context";
import { useDocumentTitle } from "../../utils";
import "./liked.css";

export const Liked = () => {
  useDocumentTitle("Liked");
  const { likesToShow } = useLike();

  return (
    <main className="liked-main ">
      <div className="videos-display-wrapper">
        {likesToShow.length === 0
          ? "You haven't liked any videos yet!"
          : likesToShow.map((video) => <Card video={video} key={video._id} />)}
      </div>
    </main>
  );
};
