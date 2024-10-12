import * as yup from "yup";

export const editUserValidationschema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    avatar: yup
      .string()
      .url("Invalid URL")
      .matches(
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
        "URL must end in png, jpg, jpeg, gif, bmp or webp"
      ),
    phone: yup
      .string()
      .matches(/^\+38\d{10}$/, "The phone number must be in the format +380XXXXXXXXX")
      .required("Phone number is required"),
  });