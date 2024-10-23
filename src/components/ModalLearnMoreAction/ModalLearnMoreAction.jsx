import React from "react";
import css from "./ModalLearnMoreAction.module.css";
import sprite from "../../assets/icons/sprite.svg";
import BaseModal from "../BaseModal/BaseModal";
import HeardButton from "../HeardButton/HeardButton";

const ModalLearnMoreAction = ({ isOpen, onRequestClose, notice }) => {
  const handleCancel = () => {
    onRequestClose();
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={handleCancel}>
          <svg width="24" height="24" style={{ stroke: "#000000" }}>
            <use xlinkHref={`${sprite}#x`} />
          </svg>
        </button>

        <div className={css.imgWrap}>
          <img src={notice.imgURL} alt={notice.title} className={css.img} />
          <div className={css.imgTab}>Sell</div>
        </div>

        <h2 className={css.header}>{notice.title}</h2>

        <div className={css.noticeItemPopularity}>
          <svg width="16" height="16">
            <use xlinkHref={`${sprite}#star`} />
          </svg>
          {notice.popularity}
        </div>

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

        <div className={css.buttonGroup}>
          <HeardButton
            noticeId={notice._id}
            className={css.buttonAddToFavorites}
          >
            Add to{" "}
            <svg
              className={css.noticeItemPopularityIcon}
              width="18"
              height="18"
            >
              <use xlinkHref={`${sprite}#heartWhite`} />
            </svg>
          </HeardButton>
          <button className={css.buttonContact}>Contact</button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalLearnMoreAction;
