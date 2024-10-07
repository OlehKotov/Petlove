import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect, useRef, useState } from "react";

const Header = ({
  isHeaderAuth = "",
  variant,
  width,
  height,
  icon,
  burgerColor,
  closeColor,
  menuClass,
  nav,
  authNav,
}) => {
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
    <header className={`${css.header} ${css[isHeaderAuth]}`}>
      <div className={css.container}>
        <Logo variant={variant} width={width} height={height} icon={icon} />

        <button className={css.burgerButton} onClick={toggleMenu}>
          <svg width="32" height="32" style={{ stroke: burgerColor }}>
            <use xlinkHref={`${sprite}#burger`} />
          </svg>
        </button>

        <div
          className={`${css.menu} ${isMenuOpen ? css.menuOpen : ""} ${
            css[menuClass]
          }`}
          ref={menuRef}
        >
          <button className={css.closeButton} onClick={toggleMenu}>
            <svg width="32" height="32" style={{ stroke: closeColor }}>
              <use xlinkHref={`${sprite}#x`} />
            </svg>
          </button>
          <Nav nav={nav} />
          <AuthNav authNav={authNav} />
        </div>
      </div>
    </header>
  );
};

export default Header;
