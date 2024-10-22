import React, { useState } from "react";
import css from "./NewsPage.module.css";
import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField";
import Header from "../../components/Header/Header";
import NewsList from "../../components/NewsList/NewsList";

const NewsPage = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (keyword) => {
    setKeyword(keyword);
  };

  return (
    <div className={css.container}>
      <Header
        isHeaderAuth="headerAuth"
        variant="auth"
        icon="iconAuth"
        burgerColor="#000000"
        closeColor="#ffffff"
        menuClass="menuOrange"
        authNav="mobMenuLogInBtnOrange"
      />
      <div className={css.contentContainer}>
        <div className={css.titleContainer}>
          <Title>News</Title>
          <SearchField onSearch={handleSearch} />
        </div>
        <NewsList keyword={keyword} />
      </div>
    </div>
  );
};

export default NewsPage;
