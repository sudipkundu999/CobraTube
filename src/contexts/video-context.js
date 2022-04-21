import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../utils";

const VideoContext = createContext();

const useVideos = () => useContext(VideoContext);

const VideoProvider = ({ children }) => {
  //Initial Fetching of Videos from DB
  const [videosFromDB, setVideosFromDB] = useState([]);

  const {
    response: responseVideos,
    loading: loadingVideos,
    operation: fetchVideos,
  } = useAxios();

  useEffect(() => {
    fetchVideos({ method: "get", url: "/api/videos" });
  }, []);

  useEffect(
    () =>
      responseVideos !== undefined && setVideosFromDB(responseVideos.videos),
    [responseVideos]
  );

  //Initial Fetching of Categories from DB
  const [categoriesFromDB, setCategoriesFromDB] = useState([]);

  const { response: responseCategory, operation: fetchCategories } = useAxios();

  useEffect(() => {
    fetchCategories({ method: "get", url: "/api/categories" });
  }, []);

  useEffect(() => {
    responseCategory !== undefined &&
      setCategoriesFromDB(responseCategory.categories);
    setCategoriesFromDB((prev) => prev.map((obj) => obj.categoryName));
  }, [responseCategory]);

  return (
    <VideoContext.Provider
      value={{
        videosFromDB,
        loadingVideos,
        categoriesFromDB,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { useVideos, VideoProvider };
