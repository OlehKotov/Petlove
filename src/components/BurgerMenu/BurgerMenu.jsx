import React, { useEffect, useRef, useState } from "react";
import css from "./BurgerMenu.module.css";
import sprite from "../../assets/icons/sprite.svg";

const BurgerMenu = ({ children, burgerColor, closeColor, menuClass }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest(`.${css.burgerButton}`)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.burgerMenu}>
      <button className={css.burgerButton} onClick={toggleMenu}>
        <svg
          width="32"
          height="32"
          style={{ stroke: isMenuOpen ? closeColor : burgerColor }}
        >
          <use xlinkHref={`${sprite}#${isMenuOpen ? "x" : "burger"}`} />
        </svg>
      </button>
      <div
        className={`${css.menu} ${isMenuOpen ? css.menuOpen : ""} ${
          css[menuClass]
        }`}
        ref={menuRef}
      >
        {children}
      </div>
    </div>
  );
};

export default BurgerMenu;
