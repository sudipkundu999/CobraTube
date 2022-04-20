import { HomeCategories, HomeHero } from "../../components";
import "./homepage.css";
export const Homepage = () => {
  return (
    <main className="homepage-main">
      <HomeHero />
      <HomeCategories />
    </main>
  );
};
