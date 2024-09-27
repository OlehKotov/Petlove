import React from "react";
import css from "./RegistrationPage.module.css";
import Header from "../../components/Header/Header";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className={css.container}>
      <Header
        variant="auth"
        width="17"
        height="13"
        icon="iconAuth"
        burgerColor="#000000"
        closeColor="#ffffff"
        menuClass="menuOrange"
        authTheme="mobMenuLogInBtnOrange"
      />
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
