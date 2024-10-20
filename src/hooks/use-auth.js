import { useSelector } from "react-redux";

export function useAuth() {
  const { email, token, _id, name } = useSelector((state) => state.user.user);
  return {
    isAuth: !!email,
    email,
    token,
    _id,
    name,
  };
}