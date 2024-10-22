import { useState } from "react";
import css from "./LoginForm.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logInValidationschema } from "../../validation/logInValidationShema";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PetBlock from "../PetBlock/PetBlock";
import dogImageMobile from "../../assets/images/dog-mob-min.jpg";
import dogImageTablet from "../../assets/images/dog-tab-min.png";
import dogImageDesktop from "../../assets/images/dog-dt-min.png";
import { login } from "../../redux/users/userOps";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(logInValidationschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const { userData } = data;
    dispatch(login(data)).then(() => {
      reset();
    });
  };

  return (
    <div className={css.containerForm}>
      <PetBlock
        srcMobile={dogImageMobile}
        srcTablet={dogImageTablet}
        srcDesktop={dogImageDesktop}
        alt="dog"
        className="image"
      />
      <div className={css.registerForm}>
        <h1 className={css.headerForm}>Log in</h1>
        <p className={css.textForm}>
          Welcome! Please enter your credentials to login to the platform:.
        </p>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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

          <button type="submit" className={css.button} disabled={isSubmitting}>
            Log In
          </button>
          <p className={css.navigationText}>
            Don’t have an account?{" "}
            <NavLink to="/register" className={css.navigationLink}>
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
