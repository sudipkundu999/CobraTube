import { Link } from "react-router-dom";
import "./home-hero.css";
export const HomeHero = () => {
  return (
    <div
      className="hero-section"
      style={{
        background: `url(${process.env.PUBLIC_URL + "/images/heroImage.jpg"})`,
      }}
    >
      <div className="hero-text-wrapper">
        <div className="hero-text">
          A VIDEO LIBRARY FOR BOOK LOVERS <br />
          <span className="hero-text-small">
            Find videos on your favourite books <br /> by your favourite authors{" "}
          </span>
        </div>

        <button className="btn btn-hero">
          <Link
            to="/videos"
            // onClick={() => }
          >
            SHOW VIDEOS
          </Link>
        </button>
      </div>
    </div>
  );
};
