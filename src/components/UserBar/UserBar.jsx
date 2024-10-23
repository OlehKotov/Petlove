import React, { useEffect } from "react";
import css from "./UserBar.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAvatar } from "../../redux/selectors";
import { currentUserFull } from "../../redux/users/userOps";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const UserBar = ({ isInHomeUserBar }) => {
  const dispatch = useDispatch();
  const avatar = useSelector(selectUserAvatar);
  const { isAuth, token, name } = useAuth();

  useEffect(() => {
    if (isAuth && token) {
      dispatch(currentUserFull());
    }
  }, [dispatch, isAuth, token]);

  return (
    <div className={css.userContainer}>
      {avatar ? (
        <div className={css.userBarContainer}>
          <NavLink to="/profile">
            <img
              src={avatar}
              alt="User Avatar"
              className={css.userContainerImgPhoto}
            />
          </NavLink>
          <span className={`${css.userName} ${isInHomeUserBar ? css.nameHome : ""}`}>{name}</span>
        </div>
      ) : (
        <div className={css.userBarContainer}>
          <NavLink to="/profile">
            <div className={css.userContainerImgSvg}>
              <svg width="20" height="20">
                <use xlinkHref={`${sprite}#user-foto`} />
              </svg>
            </div>
          </NavLink>
          <span className={`${css.userName} ${isInHomeUserBar ? css.nameHome : ""}`}>{name}</span>
        </div>
      )}
    </div>
  );
};

export default UserBar;
