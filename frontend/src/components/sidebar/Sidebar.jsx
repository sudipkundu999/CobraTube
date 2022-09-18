import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  BxBxsVideos,
  BxHome,
  FluentThumbLike16Regular,
  MdiClockTimeFourOutline,
  PhClockCounterClockwiseFill,
  SubwayCompass,
} from "../../assets/icons/Icons";
import "./sidebar.css";
export const Sidebar = () => {
  const location = useLocation();
  useEffect(() => window.scroll(0, 0), [location.pathname]);

  return (
    <aside>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-nav" : "inactive-nav")}
      >
        <BxHome /> <span>Home</span>
      </NavLink>
      <NavLink
        to="/playlist"
        className={({ isActive }) => (isActive ? "active-nav" : "inactive-nav")}
      >
        <BxBxsVideos /> <span>Playlist</span>
      </NavLink>
      <NavLink
        to="/liked"
        className={({ isActive }) => (isActive ? "active-nav" : "inactive-nav")}
      >
        <FluentThumbLike16Regular />
        <span>Liked Videos</span>
      </NavLink>
      <NavLink
        to="/watchlater"
        className={({ isActive }) => (isActive ? "active-nav" : "inactive-nav")}
      >
        <MdiClockTimeFourOutline />
        <span>Watch Later</span>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? "active-nav" : "inactive-nav")}
      >
        <PhClockCounterClockwiseFill />
        <span>History</span>
      </NavLink>
    </aside>
  );
};
