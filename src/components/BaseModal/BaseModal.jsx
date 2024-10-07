import React, { useEffect } from 'react'
import Modal from 'react-modal';
import css from "./BaseModal.module.css";

Modal.setAppElement('#root');

const BaseModal = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
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

export default BaseModal