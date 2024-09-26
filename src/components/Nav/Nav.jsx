import React from "react";
import css from "./Nav.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const linkActive = ({ isActive }) => clsx(css.link, isActive && css.active);

  return (
    <div className={css.nav}>
      <NavLink to="/news" className={linkActive}>
        News
      </NavLink>
      <NavLink to="/notices" className={linkActive}>
        Find pet
      </NavLink>
      <NavLink to="/friends" className={linkActive}>
        Our friends
      </NavLink>
    </div>
  );
};

export default Nav;
