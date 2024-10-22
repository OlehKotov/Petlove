import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect, useRef, useState } from "react";
import UserBar from "../UserBar/UserBar";
import { useAuth } from "../../hooks/use-auth";

const Header = ({
  isHeaderAuth = "",
  variant,
  icon,
  burgerColor,
  closeColor,
  menuClass,
  nav,
  authNav,
  isInHomeUserBar,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const menuRef = useRef(null);

  const { isAuth, token } = useAuth();

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
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
      setIsTablet(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`${css.header} ${css[isHeaderAuth]}`}>
      <div className={css.container}>
        <Logo variant={variant} icon={icon} />
        {isDesktop ? (
          <>
            <Nav nav={nav}/>
            <div className={css.userAuthContainer}>
              <AuthNav authNav={authNav} isInHeader={true} />
              {isAuth && token ? <UserBar isInHomeUserBar={isInHomeUserBar}/> : null}
            </div>
          </>
        ) : (
          <div className={css.authWrap}>
            {isTablet && <AuthNav authNav={authNav} isInHeader={true} isInHome={true} />}
            <div className={css.burgerWrap}>
              {isAuth && token ? <UserBar isInHomeUserBar={isInHomeUserBar}/> : null}

              <button className={css.burgerButton} onClick={toggleMenu}>
                <svg width="32" height="32" style={{ stroke: burgerColor }}>
                  <use xlinkHref={`${sprite}#burger`} />
                </svg>
              </button>
            </div>
          </div>
        )}
        {!isDesktop && (
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
            <Nav nav={nav}/>
            <AuthNav authNav={authNav} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
