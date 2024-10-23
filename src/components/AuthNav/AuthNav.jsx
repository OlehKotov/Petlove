import React from "react";
import css from "./AuthNav.module.css";
import Button from "../Button/Button";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import { useAuth } from "../../hooks/use-auth";

const AuthNav = ({ authNav, isInHeader, isInHome }) => {
  const { isAuth } = useAuth();

  return (
    <div
      className={`${isInHeader ? css.headerAuthNav : css.menuAuthNav} ${
        isInHome ? css.headerHomeAuthNav : css.menuAuthNav
      }`}
    >
      {isAuth ? (
        <LogOutBtn
          className={`${
            isInHeader ? "userBarlogoutButton" : "headerLogOutBtn"
          }`}
        />
      ) : (
        <>
          <Button
            path="/login"
            className={`${isInHeader ? "tabMenuLogInBtn" : "mobMenuLogInBtn"}`}
            authTheme={authNav}
          >
            Log in
          </Button>
          <Button
            path="/register"
            className={`${
              isInHeader ? "tabMenuRegistrationBtn" : "mobMenuRegistrationBtn"
            }`}
          >
            Registration
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthNav;
