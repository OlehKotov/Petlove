import React from "react";
import css from "./NotFoundPage.module.css";
import Header from "../../components/Header/Header";
import cat404 from "../../assets/images/cat404-min.png";
import Button from "../../components/Button/Button";

const NotFoundPage = () => {
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
        <h1 className={css.contentHeader}>
          4<img src={cat404} alt={"cat"} className={css.img} />4
        </h1>
        <p className={css.contentText}>Ooops! This page not found :(</p>
        <Button path="/home" className="notFoundButton">
          To home page
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
