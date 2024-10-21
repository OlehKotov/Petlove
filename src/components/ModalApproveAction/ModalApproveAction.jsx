import React from "react";
import css from "./ModalApproveAction.module.css";
import BaseModal from "../BaseModal/BaseModal";
import cat from "../../assets/images/cat-min.png";
import sprite from "../../assets/icons/sprite.svg";

const ModalApproveAction = ({
  isOpen,
  onRequestClose,
  onConfirm,
  isLoading,
  isError,
}) => {
  const handleCancel = () => {
    onRequestClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={handleCancel}>
          <svg width="24" height="24" style={{ stroke: "#000000" }}>
            <use xlinkHref={`${sprite}#x`} />
          </svg>
        </button>
        <img src={cat} alt={"cat"} className={css.img} />
        <h2 className={css.header}>Already leaving?</h2>
        {isError && (
          <p className={css.error}>An error occurred. Please try again.</p>
        )}
        <div className={css.buttonGroup}>
          <button
            onClick={handleConfirm}
            className={css.confirmButton}
            disabled={isLoading}
          >
            Yes
          </button>
          <button
            onClick={handleCancel}
            className={css.cancelButton}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalApproveAction;
