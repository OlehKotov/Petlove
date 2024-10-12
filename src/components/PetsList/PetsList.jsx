import React from "react";
import { useSelector } from "react-redux";
import { selectUserPets } from "../../redux/selectors";

import css from "./PetsList.module.css";
import PetsItem from "../PetsItem/PetsItem";

const PetsList = () => {
  const pets = useSelector(selectUserPets);

  return (
    <div>
      <ul className={css.petsList}>
        {pets.map((petItem) => (
          <PetsItem key={petItem._id} pet={petItem} />
        ))}
      </ul>
    </div>
  );
};

export default PetsList;
