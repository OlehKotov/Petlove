import React from "react";
import css from "./AuthNav.module.css";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/selectors";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

const AuthNav = ({ authNav }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.authNav}>
      {isLoggedIn ? (
        <LogOutBtn />
      ) : (
        <>
          <Button path="/login" className="mobMenuLogInBtn" authTheme={authNav}>
            Log in
          </Button>
          <Button path="/register" className="mobMenuRegistrationBtn">
            Registration
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthNav;
