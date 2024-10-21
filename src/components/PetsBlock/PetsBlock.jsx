import React from "react";
import AddPet from "../AddPet/AddPet";
import css from "./PetsBlock.module.css";
import PetsList from "../PetsList/PetsList";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

const PetsBlock = () => {
  return (
    <div className={css.petsBlockContainer}>
      <AddPet />
      <PetsList />
      <LogOutBtn className="petblock" />
    </div>
  );
};

export default PetsBlock;
