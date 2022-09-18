import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import "./header.css";
import { useEffect } from "react";
import {
  fetchAllPlaylists,
  fetchCategories,
  fetchHistory,
  fetchLike,
  fetchVideos,
  fetchWatchlater,
  logout,
  resetHistory,
  resetLike,
  resetWatchlater,
  verifyUser,
} from "../../features";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isUserLoggedIn, userName } = useSelector((state) => state.auth);
  const { videosFromDB } = useSelector((state) => state.video);

  const searchOptions = videosFromDB.map((item) => ({
    ...item,
    label: item.videoTitle,
  }));

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchLike());
      dispatch(fetchHistory());
      dispatch(fetchWatchlater());
      dispatch(fetchAllPlaylists());
      setTimeout(() => {
        navigate(location.state?.from?.pathname || "/");
      }, 0);
    } else {
      dispatch(resetLike());
      dispatch(resetHistory());
      dispatch(resetWatchlater());
      navigate("/");
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchCategories());
    if (localStorage.getItem("cobraToken")) {
      dispatch(verifyUser());
    }
  }, []);

  return (
    <header>
      <div className="navigation-container">
        <Link to="/">
          <h2>CobraTube</h2>
        </Link>
        <div className="nav-search search-desktop search-wrapper">
          <Select
            options={searchOptions}
            isClearable="true"
            placeholder="Search"
            onChange={(opt) => {
              if (opt) {
                navigate("/");
                setTimeout(() => {
                  navigate(`/${opt?._id}`, { replace: true });
                }, 0);
              }
            }}
          />
        </div>
        <div className="nav-right">
          {isUserLoggedIn && (
            <button
              className="btn btn-secondary"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          )}
          <Link className="nav-links" to={isUserLoggedIn ? `/user` : `/login`}>
            <i className="fas fa-user fa-2x"></i>
            <span>{userName}</span>
          </Link>
        </div>
      </div>
      <div className="nav-search search-mobile search-wrapper">
        <Select
          options={searchOptions}
          isClearable="true"
          placeholder="Search"
          onChange={(opt) => {
            if (opt) {
              navigate("/");
              setTimeout(() => {
                navigate(`/${opt?._id}`, { replace: true });
              }, 0);
            }
          }}
        />
      </div>
    </header>
  );
};
