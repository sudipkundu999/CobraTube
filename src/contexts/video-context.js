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

  //Filter videos based on chips selected
  const [filterBy, setFilterBy] = useState({ chips: "All", date: "" });
  const videosToShow = videosFromDB
    .filter((video) =>
      filterBy.chips === "All" ? true : video.videoCategory === filterBy.chips
    )
    .sort((a, b) => {
      const { day: aDD, month: aMM, year: aYYYY } = a.videoUploadedOn;
      const { day: bDD, month: bMM, year: bYYYY } = b.videoUploadedOn;
      const difference = new Date(aYYYY, aMM, aDD) - new Date(bYYYY, bMM, bDD);
      if (filterBy.date === "Oldest to newest") {
        return difference;
      } else if (filterBy.date === "Newest to Oldest") {
        return -difference;
      }
    });

  return (
    <VideoContext.Provider
      value={{
        videosFromDB,
        loadingVideos,
        categoriesFromDB,
        videosToShow,
        setFilterBy,
        filterBy,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { useVideos, VideoProvider };
