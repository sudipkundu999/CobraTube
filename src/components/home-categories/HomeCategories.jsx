import { useNavigate } from "react-router-dom";
import { useVideos } from "../../contexts";
import "./home-categories.css";

export const HomeCategories = () => {
  const { categoriesFromDB, setFilterBy } = useVideos();
  const navigate = useNavigate();
  return (
    <div className="home-categories">
      {categoriesFromDB.map((category, index) => (
        <div
          key={index}
          className="category-card"
          style={{
            background: `url(${
              process.env.PUBLIC_URL + "/images/categoryImage.jpg"
            })`,
          }}
        >
          <div
            className="category-text-wrapper"
            onClick={(e) => {
              setFilterBy((prev) => ({ ...prev, chips: e.target.innerText }));
              navigate("/videos");
              window.scroll(0, 0);
            }}
          >
            {category}
          </div>
        </div>
      ))}
    </div>
  );
};
