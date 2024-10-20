import React from "react";
import css from "./NoticesItem.module.css";
import sprite from "../../assets/icons/sprite.svg";
import HeardButton from "../HeardButton/HeardButton";

const NoticesItem = ({ notice }) => {
  return (
    <li className={css.noticeItem}>
      <img
        src={notice.imgURL}
        alt="Animal foto"
        className={css.noticeItemImg}
      />

      <div className={css.noticeItemContent}>
        <div className={css.noticeItemHeaderContainer}>
          <h2 className={css.noticeItemHeader}>{notice.title}</h2>
          <div className={css.noticeItemPopularity}>
            <svg width="16" height="16">
              <use xlinkHref={`${sprite}#star`} />
            </svg>
            {notice.popularity}
          </div>
        </div>

        <div className={css.noticeItemContainer}>
          <div className={css.noticeItemInfoContainer}>
            <div className={css.noticeItemInfoItem}>
              <h3 className={css.noticeItemInfoItemHeader}>Name</h3>
              <p className={css.noticeItemInfoItemText}>{notice.name}</p>
            </div>
            <div className={css.noticeItemInfoItem}>
              <h3 className={css.noticeItemInfoItemHeader}>Birthday</h3>
              <p className={css.noticeItemInfoItemText}>{notice.birthday}</p>
            </div>
            <div className={css.noticeItemInfoItem}>
              <h3 className={css.noticeItemInfoItemHeader}>Sex</h3>
              <p className={css.noticeItemInfoItemText}>{notice.sex}</p>
            </div>
            <div className={css.noticeItemInfoItem}>
              <h3 className={css.noticeItemInfoItemHeader}>Species</h3>
              <p className={css.noticeItemInfoItemText}>{notice.species}</p>
            </div>
            <div className={css.noticeItemInfoItem}>
              <h3 className={css.noticeItemInfoItemHeader}>Category</h3>
              <p className={css.noticeItemInfoItemText}>{notice.category}</p>
            </div>
          </div>
          <p className={css.noticeItemInfoComment}>{notice.comment}</p>
        </div>
      </div>

      <div className={css.noticeItemButtonStar}>
        <button className={css.noticeButton}>Learn more</button>
        <HeardButton noticeId={notice._id} />
      </div>
    </li>
  );
};

export default NoticesItem;
