import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./LogOutBtn.module.css";
import { logout } from "../../redux/users/userOps";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

const LogOutBtn = ({ className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isError = useSelector((state) => state.user.isError);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      localStorage.clear();
      window.location.href = "/home";
    } catch (error) {
      console.error("Error logging out:", error);
    }
    handleCloseModal();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`${css.logoutButton} ${css[className]}`}
      >
        Log Out
      </button>
      <ModalApproveAction
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};

export default LogOutBtn;
