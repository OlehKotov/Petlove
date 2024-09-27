import React from "react";
import css from "./Button.module.css";
import { NavLink } from "react-router-dom";

const Button = ({ children, path, className = "", authTheme = "" }) => {
  return (
    <NavLink
      to={path}
      className={`${css.button} ${css[className]} ${css[authTheme]}`}
    >
      {children}
    </NavLink>
  );
};

export default Button;
