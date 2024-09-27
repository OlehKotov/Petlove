import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = ({variant, width, height, icon, burgerColor, closeColor, menuClass, theme, authTheme}) => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo variant={variant} width={width} height={height} icon={icon} />
        <BurgerMenu burgerColor={burgerColor} closeColor={closeColor} menuClass={menuClass}>
          <Nav theme={theme}/>
          <AuthNav authTheme={authTheme}/>
        </BurgerMenu>
      </div>
    </header>
  );
};

export default Header;
