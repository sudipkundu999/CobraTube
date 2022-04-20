import "./home-categories.css";
export const HomeCategories = () => {
  const categoriesFromDB = [
    "Fiction",
    "Poetry",
    "Educational",
    "Life Changing",
  ];
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
          //   onClick={() => {}}
        >
          <div className="category-text-wrapper">{category}</div>
        </div>
      ))}
    </div>
  );
};
