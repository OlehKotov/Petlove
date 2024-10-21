import React, { useEffect } from "react";
import Modal from "react-modal";
import css from "./BaseModal.module.css";

Modal.setAppElement("#root");

const BaseModal = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContainer}
      overlayClassName={css.modalOverlay}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
