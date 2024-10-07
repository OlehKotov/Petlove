import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
