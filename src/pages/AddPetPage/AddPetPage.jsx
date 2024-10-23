import React from "react";
import css from "./AddPetPage.module.css";
import Header from "../../components/Header/Header";
import PetBlock from "../../components/PetBlock/PetBlock";
import dogMob from "../../assets/images/AddPetDogMob-min.png";
import dogTab from "../../assets/images/AddPetDogTab-min.png";
import dogDt from "../../assets/images/AddPetDogDt-min.png";
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
      <div className={css.content}>
        <PetBlock
          srcMobile={dogMob}
          srcTablet={dogTab}
          srcDesktop={dogDt}
          alt="dog"
          className="addPetImg"
          showTab={false}
        />
        <AddPetForm />
      </div>
    </div>
  );
};

export default AddPetPage;
