import React, { useState } from "react";
import css from "./EditUserBtn.module.css";
import sprite from "../../assets/icons/sprite.svg";
import ModalEditUser from "../ModalEditUser/ModalEditUser";

const EditUserBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.button} onClick={handleOpenModal}>
        <svg width="18px" height="18px">
          <use xlinkHref={`${sprite}#edit`} />
        </svg>
      </button>
      <ModalEditUser isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </>
  );
};

export default EditUserBtn;
