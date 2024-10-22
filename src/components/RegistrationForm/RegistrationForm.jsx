import React, { useState } from "react";
import css from "./RegistrationForm.module.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationValidationSchema } from "../../validation/registrationValidationShema";
import sprite from "../../assets/icons/sprite.svg";
import { NavLink } from "react-router-dom";
import PetBlock from "../PetBlock/PetBlock";
import catImageMobile from "../../assets/images/cat-mob-min.jpg";
import catImageTablet from "../../assets/images/cat-tab-min.png";
import catImageDesktop from "../../assets/images/cat-dt-min.png";
import { register } from "../../redux/users/userOps";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ name, email, password }) => {
    await dispatch(register({ name, email, password }));
    reset();
  };

  return (
    <div className={css.containerForm}>
      <PetBlock srcMobile={catImageMobile}
        srcTablet={catImageTablet}
        srcDesktop={catImageDesktop} alt="cat" className="image" tab={true} />
      <div className={css.registerForm}>
        <h1 className={css.headerForm}>Registration</h1>
        <p className={css.textForm}>
          Thank you for your interest in our platform.
        </p>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputWrapper}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.registerInput} ${
                    errors.name ? css.errorInput : ""
                  }`}
                  type="text"
                  placeholder="Name"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <div className={css.error}>{errors.name.message}</div>
            )}
          </div>

          <div className={css.inputWrapper}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  className={`${css.registerInput} ${
                    errors.email ? css.errorInput : ""
                  }`}
                  type="text"
                  placeholder="Email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <div className={css.error}>{errors.email.message}</div>
            )}
          </div>

          <div className={css.inputWrapper}>
            <div className={css.input}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    className={`${css.registerInput} ${
                      errors.password ? css.errorInput : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                )}
              />
              <svg
                className={`${css.passwordToggleIcon} ${
                  errors.password ? css.errorIcon : ""
                }`}
                onClick={togglePasswordVisibility}
                width="20px"
                height="20px"
              >
                <use
                  xlinkHref={`${sprite}#${
                    errors.password
                      ? "cross-small"
                      : showPassword
                      ? "eye"
                      : "eye-off"
                  }`}
                />
              </svg>
            </div>
            {errors.password && (
              <div className={css.error}>{errors.password.message}</div>
            )}
          </div>

          <div className={css.inputWrapper}>
            <div className={css.input}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input
                    className={`${css.registerInput} ${
                      errors.confirmPassword ? css.errorInput : ""
                    }`}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...field}
                  />
                )}
              />
              <svg
                className={`${css.passwordToggleIcon} ${
                  errors.confirmPassword ? css.errorIcon : ""
                }`}
                onClick={toggleConfirmPasswordVisibility}
                width="20px"
                height="20px"
              >
                <use
                  xlinkHref={`${sprite}#${
                    errors.confirmPassword
                      ? "cross-small"
                      : showConfirmPassword
                      ? "eye"
                      : "eye-off"
                  }`}
                />
              </svg>
            </div>

            {errors.password && (
              <div className={css.error}>{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className={css.button} disabled={isSubmitting}>
            Registration
          </button>
          <p className={css.navigationText}>
            Already have an account?{" "}
            <NavLink to="/login" className={css.navigationLink}>
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
