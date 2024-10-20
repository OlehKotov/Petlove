import React, { useEffect } from "react";
import css from "./UserBar.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectToken,
  selectUserAvatar,
} from "../../redux/selectors";
import { currentUserFull } from "../../redux/users/userOps";
import { NavLink } from "react-router-dom";

const UserBar = () => {
  const dispatch = useDispatch();
  const avatar = useSelector(selectUserAvatar);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(currentUserFull());
    }
  }, [dispatch, isLoggedIn, token]);

  return (
    <div className={css.userContainer}>
      {avatar ? (
        <NavLink to="/profile">
          <img
            src={avatar}
            alt="User Avatar"
            className={css.userContainerImgPhoto}
          />
        </NavLink>
      ) : (
        <NavLink to="/profile">
          <div className={css.userContainerImgSvg}>
            <svg width="20" height="20">
              <use xlinkHref={`${sprite}#user-foto`} />
            </svg>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default UserBar;
