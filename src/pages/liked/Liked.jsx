import { useSelector } from "react-redux";
import { Card } from "../../components/card/Card";
import { useDocumentTitle } from "../../utils";
import "./liked.css";

export const Liked = () => {
  useDocumentTitle("Liked");
  const { likesToShow } = useSelector((state) => state.like);

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
