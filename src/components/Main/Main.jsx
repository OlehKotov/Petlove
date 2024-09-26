import React from "react";
import css from "./Main.module.css";
import Header from "../Header/Header";

const Main = () => {
  return (
    <div className={css.home}>
      <Header />
      <main>
        <div className={css.blockWithText}></div>
        <div className={css.blockWithImg}></div>
      </main>
    </div>
  );
};

export default Main;
