import { useDocumentTitle } from "../../utils";
import "./page404.css";

export const Page404 = () => {
  useDocumentTitle("Error 404");

  return (
    <main className="page404-main">
      <h1>Error 404 : Page not found</h1>
    </main>
  );
};
