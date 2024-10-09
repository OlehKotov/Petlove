import React from 'react'
import css from "./UserCard.module.css";
import EditUserBtn from '../EditUserBtn/EditUserBtn';
import UserBlock from '../UserBlock/UserBlock';

const UserCard = () => {
  return (
    <div className={css.container}>
        <EditUserBtn />
        <UserBlock />
    </div>
  )
}

export default UserCard