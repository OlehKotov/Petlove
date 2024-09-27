import React, { useEffect, useState } from "react";
import css from "./Loader.module.css";
import sprite from "../../assets/icons/sprite.svg";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setTimeout(onComplete, 0);
          return oldProgress;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={css.loader}>
      <div className={css.circle}>
        <svg className={css.spin} width="270" height="270">
          <use xlinkHref={`${sprite}#Ellipse119`} />
        </svg>
        <div className={css.percent}>{progress}%</div>
      </div>
    </div>
  );
};

export default Loader;
