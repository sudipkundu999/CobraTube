import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../utils";
import { useAuth } from "./auth-context";

const WatchlaterContext = createContext();

const useWatchlater = () => useContext(WatchlaterContext);

const WatchlaterProvider = ({ children }) => {
  const [watchlaterToShow, setWatchlaterToShow] = useState([]);
  const {
    response: responseWatchlater,
    loading: loadingWatchlater,
    operation: operationWatchlater,
  } = useAxios();

  const fetchWatchlater = () => {
    operationWatchlater({
      method: "get",
      url: "/api/user/watchlater",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  const { isUserLoggedIn } = useAuth();
  useEffect(() => {
    isUserLoggedIn ? fetchWatchlater() : setWatchlaterToShow([]);
  }, [isUserLoggedIn]);

  const addToWatchlater = (video) => {
    operationWatchlater({
      method: "POST",
      url: "/api/user/watchlater",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: { video: video },
    });
  };

  const removeFromWatchlater = (video) => {
    operationWatchlater({
      method: "DELETE",
      url: `/api/user/watchlater/${video._id}`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  useEffect(
    () =>
      responseWatchlater !== undefined &&
      setWatchlaterToShow(responseWatchlater.watchlater),
    [responseWatchlater]
  );

  return (
    <WatchlaterContext.Provider
      value={{
        loadingWatchlater,
        watchlaterToShow,
        addToWatchlater,
        removeFromWatchlater,
      }}
    >
      {children}
    </WatchlaterContext.Provider>
  );
};

export { useWatchlater, WatchlaterProvider };
