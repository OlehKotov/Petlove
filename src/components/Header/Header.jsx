import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectToken,
  selectUserAvatar,
} from "../../redux/selectors";
import UserBar from "../UserBar/UserBar";

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

  const dispatch = useDispatch();
  const avatar = useSelector(selectUserAvatar);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

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
        <div className={css.burgerWrap}>
          {isLoggedIn && token ? <UserBar /> : null}

          <button className={css.burgerButton} onClick={toggleMenu}>
            <svg width="32" height="32" style={{ stroke: burgerColor }}>
              <use xlinkHref={`${sprite}#burger`} />
            </svg>
          </button>
        </div>

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
