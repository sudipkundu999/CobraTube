import { HomeCategories, HomeHero } from "../../components";
import { useDocumentTitle } from "../../utils";
import "./homepage.css";

export const Homepage = () => {
  useDocumentTitle("Home");

  return (
    <main className="homepage-main">
      <HomeHero />
      <HomeCategories />
    </main>
  );
};
