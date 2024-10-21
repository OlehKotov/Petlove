import React from "react";
import css from "./UserCard.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";

const UserCard = () => {
  return (
    <div className={css.container}>
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
    </div>
  );
};

export default UserCard;
