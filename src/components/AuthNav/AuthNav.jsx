import React from "react";
import css from "./AuthNav.module.css";
import Button from "../Button/Button";

const AuthNav = ({ authTheme }) => {
  return (
    <div className={css.authNav}>
      <Button path="/login" className="mobMenuLogInBtn" authTheme={authTheme}>
        Log in
      </Button>
      <Button path="/register" className="mobMenuRegistrationBtn">
        Registration
      </Button>
    </div>
  );
};

export default AuthNav;
