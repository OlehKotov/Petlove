import React from "react";
import css from "./OurFriendsPage.module.css";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import FriendsList from "../../components/FriendsList/FriendsList";

const OurFriendsPage = () => {
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
        <Title>Our friends</Title>
        <FriendsList />
      </div>
    </div>
  );
};

export default OurFriendsPage;
