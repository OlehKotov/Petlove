import React from "react";
import css from "./ModalAttentionAction.module.css";
import BaseModal from "../BaseModal/BaseModal";
import dog from "../../assets/images/dog-taba-min.png";
import sprite from "../../assets/icons/sprite.svg";
import AuthNav from "../AuthNav/AuthNav";
import Button from "../Button/Button";

const ModalAttentionAction = ({ isOpen, onRequestClose }) => {
  const handleCancel = () => {
    onRequestClose();
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={handleCancel}>
          <svg width="24" height="24" style={{ stroke: "#000000" }}>
            <use xlinkHref={`${sprite}#x`} />
          </svg>
        </button>
        <img src={dog} alt={"cat"} className={css.img} />
        <h2 className={css.header}>Attention</h2>
        <p className={css.text}>
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <div className={css.buttonGroup}>
          <Button path="/login" className={"login"}>
            Log in
          </Button>
          <Button path="/register" className={"register"}>
            Registration
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalAttentionAction;
