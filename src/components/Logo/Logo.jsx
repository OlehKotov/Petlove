import React from "react";
import css from "./Logo.module.css";
import sprite from "../../assets/icons/sprite.svg";
import clsx from "clsx";

const Logo = ({ variant, icon }) => {
  return (
    <a href="/" className={clsx(css.logo, css[variant])}>
      petl
      <svg className={clsx(css[icon])}>
        <use xlinkHref={`${sprite}#heard_mobile`} />
      </svg>
      ve
    </a>
  );
};

export default Logo;
