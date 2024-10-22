import React from "react";
import css from "./Main.module.css";
import Header from "../Header/Header";

const Main = () => {
  return (
    <div className={css.home}>
      <Header
        isHeaderAuth="headerPosition"
        variant="home"
        icon="iconHome"
        burgerColor="#ffffff"
        closeColor="#000000"
        menuClass="menuWhite"
        nav="white"
        isInHomeUserBar="true"
      />
      <main className={css.main}>
        <div className={css.blockWithText}>
          <h1 className={css.blockHeader}>
            Take good <span>care</span> of your small pets
          </h1>
          <p className={css.blockText}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>

        <div className={css.blockWithImg}></div>
      </main>
    </div>
  );
};

export default Main;
