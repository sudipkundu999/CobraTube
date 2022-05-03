import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../utils";
import { useAuth } from "./auth-context";

const HistoryContext = createContext();

const useHistory = () => useContext(HistoryContext);

const HistoryProvider = ({ children }) => {
  const [historyToShow, setHistoryToShow] = useState([]);
  const {
    response: responseHistory,
    loading: loadingHistory,
    operation: operationHistory,
  } = useAxios();

  const fetchHistory = () => {
    operationHistory({
      method: "get",
      url: "/api/user/history",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  const { isUserLoggedIn } = useAuth();
  useEffect(() => {
    isUserLoggedIn ? fetchHistory() : setHistoryToShow([]);
  }, [isUserLoggedIn]);

  const addToHistory = (video) => {
    operationHistory({
      method: "POST",
      url: "/api/user/history",
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: { video: video },
    });
  };

  const removeFromHistory = (video) => {
    operationHistory({
      method: "DELETE",
      url: `/api/user/history/${video._id}`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  const removeAllFromHistory = () => {
    operationHistory({
      method: "DELETE",
      url: `/api/user/history/all`,
      headers: {
        accept: "*/*",
        authorization: localStorage.getItem("cobraToken"),
      },
      data: {},
    });
  };

  useEffect(
    () =>
      responseHistory !== undefined &&
      setHistoryToShow(responseHistory.history),
    [responseHistory]
  );

  return (
    <HistoryContext.Provider
      value={{
        loadingHistory,
        historyToShow,
        addToHistory,
        removeFromHistory,
        removeAllFromHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export { useHistory, HistoryProvider };
