import React from "react";
import css from "./PetsItem.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch } from "react-redux";
import { deletePet } from "../../redux/users/userOps";

const PetsItem = ({ pet }) => {
  const dispatch = useDispatch();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const onDeletePet = (petId) => {
    dispatch(deletePet(petId));
  };

  return (
    <li className={css.petItem}>
      <img src={pet.imgURL} alt="Pet foto" className={css.petItemImg} />

      <div className={css.petItemContent}>
        <h2 className={css.petItemHeader}>{truncateText(pet.title, 19)}</h2>

        <div className={css.petItemInfoContainer}>
          <div className={css.petItemInfoItem}>
            <h3 className={css.petItemInfoItemHeader}>Name</h3>
            <p className={css.petItemInfoItemText}>{pet.name}</p>
          </div>
          <div className={css.petItemInfoItem}>
            <h3 className={css.petItemInfoItemHeader}>Birthday</h3>
            <p className={css.petItemInfoItemText}>{pet.birthday}</p>
          </div>
          <div className={css.petItemInfoItem}>
            <h3 className={css.petItemInfoItemHeader}>Sex</h3>
            <p className={css.petItemInfoItemText}>{pet.sex}</p>
          </div>
          <div className={css.petItemInfoItem}>
            <h3 className={css.petItemInfoItemHeader}>Species</h3>
            <p className={css.petItemInfoItemText}>{pet.species}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          onDeletePet(pet._id);
        }}
        className={css.petItemTrashButton}
      >
        <svg className={css.icon} width="16" height="16">
          <use xlinkHref={`${sprite}#trash`} />
        </svg>
      </button>
    </li>
  );
};

export default PetsItem;
