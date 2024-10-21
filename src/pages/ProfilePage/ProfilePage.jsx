import React from "react";
import css from "./ProfilePage.module.css";
import UserCard from "../../components/UserCard/UserCard";
import Header from "../../components/Header/Header";
import MyNotices from "../../components/MyNotices/MyNotices";

const ProfilePage = () => {
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
        <UserCard />
        <MyNotices />
      </div>
    </div>
  );
};

export default ProfilePage;
