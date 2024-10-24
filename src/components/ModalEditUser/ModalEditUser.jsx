import React, { useState } from "react";
import css from "./ModalEditUser.module.css";
import BaseModal from "../BaseModal/BaseModal";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserAvatar,
  selectUserEmail,
  selectUserName,
  selectUserPhone,
} from "../../redux/selectors";
import { useForm } from "react-hook-form";
import { editUser } from "../../redux/users/userOps";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserValidationschema } from "../../validation/editUserValidationShema";
import { uploadImageToCloudinary } from "../../utils/saveFileToCloudinary";

const ModalEditUser = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const phone = useSelector(selectUserPhone);
  const avatar = useSelector(selectUserAvatar);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editUserValidationschema),
    defaultValues: {
      name: name || "",
      email: email || "",
      phone: phone || "",
      avatar: avatar || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (!data.avatar && data.file) {
        const url = await uploadImageToCloudinary(data.file);
        data.avatar = url;
      }

      await dispatch(editUser(data));
      onRequestClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setValue("avatar", url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onRequestClose}>
          <svg width="24" height="24" style={{ stroke: "#000000" }}>
            <use xlinkHref={`${sprite}#x`} />
          </svg>
        </button>
        <h2 className={css.header}>Edit information</h2>
        {avatar ? (
          <div className={css.userContainerImg}>
            <img
              src={avatar}
              alt="User Avatar"
              className={css.userContainerImgPhoto}
            />
          </div>
        ) : (
          <div className={css.userContainerImg}>
            <div className={css.userContainerImgSvg}>
              <svg width="40" height="40">
                <use xlinkHref={`${sprite}#user-foto`} />
              </svg>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.userInfoForm}>
            <div className={css.formGroupImg}>
              <input
                className={`${css.inputFile} ${
                  avatar ? css.filled : css.empty
                }`}
                type="text"
                {...register("avatar")}
                placeholder={avatar ? avatar : "https://"}
                readOnly
              />

              <div className={css.inputFileBtn}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput">
                  Upload photo
                  <svg className={css.icon} width="18px" height="18px">
                    <use
                      xlinkHref={`${sprite}#upload-cloud
                      `}
                    />
                  </svg>
                </label>
              </div>
              {errors.avatar && (
                <p className={css.error}>{errors.avatar.message}</p>
              )}
            </div>

            <div className={css.formGroup}>
              <input
                className={`${css.input} ${name ? css.filled : css.empty}`}
                type="text"
                placeholder={name ? name : "Name"}
                {...register("name")}
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={css.formGroup}>
              <input
                className={`${css.input} ${email ? css.filled : css.empty}`}
                type="text"
                placeholder={email ? email : "Email"}
                {...register("email")}
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={css.formGroup}>
              <input
                className={`${css.input} ${phone ? css.filled : css.empty}`}
                type="text"
                placeholder={phone ? phone : "Phone"}
                {...register("phone")}
              />
              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className={css.buttonGroup}>
            <button type="submit" className={css.submitButton}>
              Go to profile
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ModalEditUser;
