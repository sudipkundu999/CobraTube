import { Link, useNavigate } from "react-router-dom";
import { useAuth, useVideos } from "../../contexts";
import Select from "react-select";
import "./header.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchHistory,
  fetchLike,
  resetHistory,
  resetLike,
} from "../../features";

export const Header = () => {
  const { isUserLoggedIn, userName, logoutHandler } = useAuth();
  const { videosFromDB } = useVideos();

  const navigate = useNavigate();
  const searchOptions = videosFromDB.map((item) => ({
    ...item,
    label: item.videoTitle,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchLike());
      dispatch(fetchHistory());
    } else {
      dispatch(resetLike());
      dispatch(resetHistory());
    }
  }, [isUserLoggedIn]);

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
            onChange={(opt) =>
              opt && navigate(`/videos/${opt?._id}`, { replace: true })
            }
          />
        </div>
        <div className="nav-right">
          {isUserLoggedIn && (
            <button className="btn btn-secondary" onClick={logoutHandler}>
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
          onChange={(opt) =>
            opt && navigate(`/videos/${opt?._id}`, { replace: true })
          }
        />
      </div>
    </header>
  );
};
