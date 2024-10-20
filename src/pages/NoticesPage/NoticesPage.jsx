import React from "react";
import css from "./NoticesPage.module.css";
import Title from "../../components/Title/Title";
import Header from "../../components/Header/Header";
import NoticesList from "../../components/NoticesList/NoticesList";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";

const NoticesPage = () => {
  return (
    <div className={css.container}>
      <Header
        isHeaderAuth="headerAuth"
        variant="auth"
        width="17"
        height="13"
        icon="iconAuth"
        burgerColor="#000000"
        closeColor="#ffffff"
        menuClass="menuOrange"
        authNav="mobMenuLogInBtnOrange"
      />
      <div className={css.content}>
        <Title>Find your favorite pet</Title>
        <NoticesFilters />
        <NoticesList />
      </div>
    </div>
  );
};

export default NoticesPage;
