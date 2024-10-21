import React from "react";
import css from "./Title.module.css";

const Title = ({ children }) => {
  return <div className={css.title}>{children}</div>;
};

export default Title;
