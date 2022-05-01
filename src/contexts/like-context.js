import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../utils";
import { useAuth } from "./auth-context";

const LikeContext = createContext();

const useLike = () => useContext(LikeContext);

const LikeProvider = ({ children }) => {
  const [likesToShow, setLikeToShow] = useState([]);
  const {
    response: responseLike,
    loading: loadingLike,
    operation: operationLike,
  } = useAxios();

  const fetchLike = () => {
    operationLike({
      method: "get",
      url: "/api/user/likes",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  const { isUserLoggedIn } = useAuth();
  useEffect(() => {
    isUserLoggedIn ? fetchLike() : setLikeToShow([]);
  }, [isUserLoggedIn]);

  const addToLike = (video) => {
    operationLike({
      method: "POST",
      url: "/api/user/likes",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: { video: video },
    });
  };

  const removeFromLike = (video) => {
    operationLike({
      method: "DELETE",
      url: `/api/user/likes/${video._id}`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  useEffect(
    () => responseLike !== undefined && setLikeToShow(responseLike.likes),
    [responseLike]
  );

  return (
    <LikeContext.Provider
      value={{
        loadingLike,
        likesToShow,
        addToLike,
        removeFromLike,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export { useLike, LikeProvider };
