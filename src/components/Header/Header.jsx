import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo variant="home" width="15" height="13" icon="iconHome" />
        <BurgerMenu burgerColor="#ffffff" closeColor="#000000">
          <Nav />
          <AuthNav />
        </BurgerMenu>
      </div>
    </header>
  );
};

export default Header;
