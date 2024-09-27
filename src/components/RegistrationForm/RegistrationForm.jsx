import React from "react";
import css from "./RegistrationForm.module.css";
import { Controller } from "react-hook-form";

const RegistrationForm = () => {
  return (
    <div className={css.containerForm}>
      <div className={css.registerImg}></div>
      <div className={css.registerForm}>
        <h1 className={css.headerForm}>Registration</h1>
        <p className={css.textForm}>Thank you for your interest in our platform.</p>
        <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                className={css.loginInput}
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
                className={css.loginInput}
                type="email"
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
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                className={css.loginInput}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...field}
              />
            )}
          />
          <svg
            className={css.passwordToggleIcon}
            onClick={togglePasswordVisibility}
            width="20px"
            height="20px"
          >
            <use xlinkHref={`${sprite}#${showPassword ? "eye" : "eye-off"}`} />
          </svg>
          {errors.password && (
            <div className={css.error}>{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className={css.button} disabled={isSubmitting}>
          Sign Up
        </button>
      </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
