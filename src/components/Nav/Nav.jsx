import React from "react";
import css from "./Nav.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const Nav = ({ theme }) => {
  const linkActive = ({ isActive }) =>
    clsx(
      css.link,
      isActive && (theme === "white" ? css.activeWhite : css.activeOrange)
    );

  const linkClass = theme === "white" ? css.linkWhite : css.linkOrange;

  return (
    <div className={css.nav}>
      <NavLink
        to="/news"
        className={({ isActive }) => clsx(linkClass, linkActive({ isActive }))}
      >
        News
      </NavLink>
      <NavLink
        to="/notices"
        className={({ isActive }) => clsx(linkClass, linkActive({ isActive }))}
      >
        Find pet
      </NavLink>
      <NavLink
        to="/friends"
        className={({ isActive }) => clsx(linkClass, linkActive({ isActive }))}
      >
        Our friends
      </NavLink>
    </div>
  );
};

export default Nav;
