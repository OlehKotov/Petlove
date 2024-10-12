import React from "react";
import css from "./AddPetPage.module.css";
import Header from "../../components/Header/Header";
import PetBlock from "../../components/PetBlock/PetBlock";
import dog from "../../assets/images/AddPetDogMob-min.png";
import AddPetForm from "../../components/AddPetForm/AddPetForm";

const AddPetPage = () => {
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
      <PetBlock src={dog} alt="dog" className="addPetImg"/>
      <AddPetForm />
      </div>
  );
};

export default AddPetPage;
