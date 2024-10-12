import React from "react";
import Button from "../Button/Button";
import css from "./AddPet.module.css";
import sprite from "../../assets/icons/sprite.svg";

const AddPet = () => {
  return (
    <div className={css.addPetContainer}>
      <h2 className={css.addPetHeader}>My pets</h2>
      <Button path="/add-pet" className="addPetBtn">
        Add pet{" "}
        <svg width="18" height="18">
          <use xlinkHref={`${sprite}#plus`} />
        </svg>
      </Button>
    </div>
  );
};

export default AddPet;
