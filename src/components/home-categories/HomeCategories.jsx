import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterByCategory } from "../../features";
import "./home-categories.css";

export const HomeCategories = () => {
  const dispatch = useDispatch();
  const { categoriesFromDB } = useSelector((state) => state.video);
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
              dispatch(filterByCategory(e.target.innerText));
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
