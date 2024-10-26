import React, { useState } from "react";
import css from "./AddPetForm.module.css";
import { addPetValidationSchema } from "../../validation/addPetValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUserPetsImgURL } from "../../redux/selectors";
import { addPet } from "../../redux/users/userOps";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../../utils/saveFileToCloudinary";

const AddPetForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector(selectUserPetsImgURL);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addPetValidationSchema),
    defaultValues: {
      sex: "",
      imgURL: "",
      title: "",
      name: "",
      birthday: "",
      species: "",
    },
  });
  const selectedSex = watch("sex");
  const urlValue = watch("url");
  const titleValue = watch("title");
  const nameValue = watch("name");
  const birthdayValue = watch("birthday");
  const speciesValue = watch("species");

  const onSubmit = async (data) => {
    try {
      if (!data.imgURL && data.file) {
        const url = await uploadImageToCloudinary(data.file);
        data.imgURL = url;
      }

      await dispatch(addPet(data));
      navigate("/profile");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setValue("imgURL", url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={css.addPetFormContainer}>
      <h2 className={css.addPetFormHeader}>
        Add my pet /<span>Personal details</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className={css.addPetForm}>
        <div className={css.formGroupGenderRadioButtons}>
          <label className={css.genderOption}>
            <input type="radio" value="female" {...register("sex")} />
            {selectedSex === "female" ? (
              <svg className={css.icon} width="32" height="32">
                <use xlinkHref={`${sprite}#female`} />
              </svg>
            ) : (
              <svg className={css.icon} width="32" height="32">
                <use xlinkHref={`${sprite}#femalenoactive`} />
              </svg>
            )}
          </label>
          <label className={css.genderOption}>
            <input type="radio" value="male" {...register("sex")} />
            {selectedSex === "male" ? (
              <svg className={css.icon} width="32" height="32">
                <use xlinkHref={`${sprite}#male`} />
              </svg>
            ) : (
              <svg className={css.icon} width="32" height="32">
                <use xlinkHref={`${sprite}#malenoactive`} />
              </svg>
            )}
          </label>
          <label className={css.genderOption}>
            <input type="radio" value="other" {...register("sex")} />
            {selectedSex === "other" ? (
              <svg className={css.icon} width="32" height="32">
                <use xlinkHref={`${sprite}#multiple`} />
              </svg>
            ) : (
              <svg className={css.icon} width="32" height="32">
                <use xlinkHref={`${sprite}#multiplenoactive`} />
              </svg>
            )}
          </label>
          {errors.sex && (
            <p className={css.genderError}>{errors.sex.message}</p>
          )}
        </div>
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
              <svg width="34" height="34">
                <use xlinkHref={`${sprite}#footprint`} />
              </svg>
            </div>
          </div>
        )}
        <div className={css.petInfoForm}>
          <div className={css.formGroupImg}>
            <Controller
              name="imgURL"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.inputFile} ${urlValue ? css.filled : ""}`}
                  type="text"
                  {...field}
                  placeholder="Enter URL"
                />
              )}
            />
            <div className={css.inputFileBtn}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="imgUrl"
                onChange={handleFileChange}
              />
              <label htmlFor="imgUrl">
                Upload photo
                <svg className={css.icon} width="18px" height="18px">
                  <use xlinkHref={`${sprite}#upload-cloud`} />
                </svg>
              </label>
            </div>
            {errors.imgURL && (
              <p className={css.error}>{errors.imgURL.message}</p>
            )}
          </div>
          <div className={css.formGroup}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.input} ${titleValue ? css.filled : ""}`}
                  id="title"
                  type="text"
                  placeholder="Title"
                  {...field}
                />
              )}
            />
            {errors.title && (
              <p className={css.error}>{errors.title.message}</p>
            )}
          </div>

          <div className={css.formGroup}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.input} ${nameValue ? css.filled : ""}`}
                  type="text"
                  id="name"
                  placeholder="Pet's Name"
                  {...field}
                />
              )}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>
        </div>

        <div className={css.formGroupDateSpec}>
          <div className={css.formGroup}>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.inputDate} ${
                    birthdayValue ? css.filled : ""
                  }`}
                  type="text"
                  id="birthday"
                  placeholder="0000.00.00"
                  {...field}
                />
              )}
            />
            <svg className={css.iconCalendar} width="18px" height="18px">
              <use xlinkHref={`${sprite}#calendar`} />
            </svg>

            {errors.birthday && (
              <div className={css.error}>{errors.birthday.message}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <Controller
              name="species"
              control={control}
              render={({ field }) => (
                <div className={css.selectContainer}>
                  <select
                    {...field}
                    name="select"
                    className={`${css.select} ${
                      speciesValue ? css.filled : ""
                    }`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  >
                    <option value="" disabled hidden>
                      Type of pet
                    </option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="monkey">Monkey</option>
                  </select>
                  <svg className={css.iconCalendar} width="18px" height="18px">
                    <use xlinkHref={`${sprite}#${isFocused ? "up" : "down"}`} />
                  </svg>
                </div>
              )}
            />
            {errors.species && (
              <p className={css.error}>{errors.species.message}</p>
            )}
          </div>
        </div>

        <div className={css.formBtns}>
          <Button path="/profile" className="formCancelBtn">
            Back
          </Button>
          <button type="submit" className={css.formSubmitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
