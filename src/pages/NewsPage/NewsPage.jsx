import React from "react";
import css from "./NewsPage.module.css";
import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField";
import Header from "../../components/Header/Header";
import NewsList from "../../components/NewsList/NewsList";

const NewsPage = () => {
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
      <div className={css.contentContainer}>
        <Title>News</Title>
        <NewsList />
      </div>
    </div>
  );
};

export default NewsPage;
