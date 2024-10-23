import React, { useEffect, useState } from "react";
import css from "./PetBlock.module.css";
import sprite from "../../assets/icons/sprite.svg";
import dogTaba from "../../assets/images/dog-taba-min.png";
import catTaba from "../../assets/images/cat-taba-min.png";

const PetBlock = ({
  srcMobile,
  srcTablet,
  srcDesktop,
  alt,
  className,
  tab,
  showTab = true,
}) => {
  const [currentSrc, setCurrentSrc] = useState(srcDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCurrentSrc(srcMobile);
      } else if (window.innerWidth <= 1280) {
        setCurrentSrc(srcTablet);
      } else {
        setCurrentSrc(srcDesktop);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [srcMobile, srcTablet, srcDesktop]);

  return (
    <div className={css.imageContainer}>
      <img src={currentSrc} alt={alt} className={className} />
      {showTab && ( // Используем новый пропс для управления отображением таба
        tab ? (
          <div className={css.tab}>
            <img src={catTaba} alt="dog" className={css.tabImg} />
            <div className={css.tabContent}>
              <div className={css.tabContentHeader}>
                <h4 className={css.tabHeader}>Jack</h4>
                <p className={css.tabHeaderDate}>
                  Birthday: <span>18.10.2021</span>
                </p>
              </div>
              <p className={css.tabText}>
                Jack is a gray Persian cat with green eyes. He loves to be
                pampered and groomed, and enjoys playing with toys.
              </p>
            </div>
          </div>
        ) : (
          <div className={css.tab}>
            <img src={dogTaba} alt="dog" className={css.tabImg} />
            <div className={css.tabContent}>
              <div className={css.tabContentHeader}>
                <h4 className={css.tabHeader}>Rich</h4>
                <p className={css.tabHeaderDate}>
                  Birthday: <span>21.09.2020</span>
                </p>
              </div>
              <p className={css.tabText}>
                Rich would be the perfect addition to an active family that loves
                to play and go on walks. I bet he would love having a doggy
                playmate too!
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PetBlock;
