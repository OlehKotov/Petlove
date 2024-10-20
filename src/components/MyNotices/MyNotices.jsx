import React from 'react'
import css from "./MyNotices.module.css";
import { useSelector } from 'react-redux';
import { selectUserNoticesFavorites } from '../../redux/selectors';
import NoticesItem from '../NoticesItem/NoticesItem';

const MyNotices = () => {

    const favorites = useSelector(selectUserNoticesFavorites);

  if (!favorites || favorites.length === 0) {
    return <p></p>;
  }


  return (
    <div className={css.newsListWrap}>
      <ul className={css.noticesList}>
      {favorites.map((noticeItem) => (
          <NoticesItem key={noticeItem._id} notice={noticeItem} />
        ))}
      </ul>
    </div>
  )
}

export default MyNotices