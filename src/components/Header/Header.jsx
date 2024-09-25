import React from 'react'
import css from "./Header.module.css";
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <div className={css.header}>
        <Logo variant="home" width="15" height="13" icon="iconHome" />
    </div>
  )
}

export default Header