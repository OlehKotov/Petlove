import React, { useEffect } from "react";
import css from "./UserBlock.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { currentUserFull } from "../../redux/users/userOps";
import {
  selectUserName,
  selectUserEmail,
  selectUserPhone,
  selectUserAvatar,
  selectIsLoggedIn,
  selectToken,
} from "../../redux/selectors";

const UserBlock = () => {
  const dispatch = useDispatch();

  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const phone = useSelector(selectUserPhone);
  const avatar = useSelector(selectUserAvatar);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(currentUserFull());
    }
  }, [dispatch, isLoggedIn, token]);

  return (
    <div className={css.userBlock}>
      <div className={css.userLabel}>
        <p className={css.userText}>User</p>
        <svg width="18" height="18">
          <use xlinkHref={`${sprite}#user`} />
        </svg>
      </div>

      <div className={css.userContainer}>
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className={css.userContainerImgPhoto}
          />
        ) : (
          <div className={css.userContainerImg}>
            <div className={css.userContainerImgSvg}>
              <svg width="40" height="40">
                <use xlinkHref={`${sprite}#user-foto`} />
              </svg>
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className={css.userContainerImgBtn}>
              Upload photo
            </label>
          </div>
        )}

        <div className={css.userInfo}>
          <h2 className={css.userInfoHeader}>My information</h2>

          <div className={css.userInfoForm}>
            <input
              className={`${css.input} ${name ? css.filled : css.empty}`}
              type="text"
              placeholder="Name"
              value={name || ""}
              readOnly
            />
            <input
              className={`${css.input} ${email ? css.filled : css.empty}`}
              type="email"
              placeholder="name@gmail.com"
              value={email || ""}
              readOnly
            />
            <input
              className={`${css.input} ${phone ? css.filled : css.empty}`}
              type="tel"
              placeholder="+380"
              value={phone || ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlock;
