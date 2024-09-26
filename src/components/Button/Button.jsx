import React from "react";
import css from "./Button.module.css";
import { NavLink } from "react-router-dom";

const Button = ({ children, path, className = "" }) => {
  return (
    <NavLink to={path} className={`${css.button} ${css[className]}`}>
      {children}
    </NavLink>
  );
};

export default Button;
