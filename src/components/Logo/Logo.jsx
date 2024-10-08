import React from "react";
import css from "./Logo.module.css";
import sprite from "../../assets/icons/sprite.svg";
import clsx from "clsx";

const Logo = ({ variant, width, height, icon }) => {
  return (
    <a href="/" className={clsx(css.logo, css[variant])}>
      petl
      <svg width={width} height={height} className={clsx(css[icon])}>
        <use xlinkHref={`${sprite}#heard_mobile`} />
      </svg>
      ve
    </a>
  );
};

export default Logo;
