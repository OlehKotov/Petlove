import React, { useEffect, useState } from "react";
import css from "./MyNotices.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserNoticesFavorites,
  selectUserNoticesViewed,
} from "../../redux/selectors";
import NoticesItem from "../NoticesItem/NoticesItem";
import { fetchFavorite, fetchViewed } from "../../redux/notices/noticesOps";

const MyNotices = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectUserNoticesFavorites);
  const viewed = useSelector(selectUserNoticesViewed);
  const [favoriteNotices, setFavoriteNotices] = useState([]);
  const [viewedNotices, setViewedNotices] = useState([]);
  const [activeTab, setActiveTab] = useState("favorites");

  useEffect(() => {
    const fetchFavorites = async () => {
      const fetchedNotices = [];
      for (const id of favorites) {
        const action = await dispatch(fetchFavorite(id));
        if (fetchFavorite.fulfilled.match(action)) {
          fetchedNotices.push(action.payload);
        }
      }
      setFavoriteNotices(fetchedNotices);
    };

    // if (favorites.length > 0) {
      fetchFavorites();
    // }
  }, [favorites, dispatch]);

  useEffect(() => {
    const fetchVieweds = async () => {
      const fetchedNotices = [];
      for (const notice of viewed) {
        const action = await dispatch(fetchViewed(notice._id));
        if (fetchViewed.fulfilled.match(action)) {
          fetchedNotices.push(action.payload);
        }
      }
      setViewedNotices(fetchedNotices);
    };

    if (viewed.length > 0) {
      fetchVieweds();
    }
  }, [viewed, dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={css.favContainer}>
      <div className={css.buttonWrap}>
        <button
          className={
            activeTab === "favorites" ? css.activeButton : css.notActiveButton
          }
          onClick={() => handleTabClick("favorites")}
        >
          My favorite pets
        </button>
        <button
          className={
            activeTab === "viewed" ? css.activeButton : css.notActiveButton
          }
          onClick={() => handleTabClick("viewed")}
        >
          Viewed
        </button>
      </div>

      {activeTab === "favorites" &&
        (favoriteNotices.length > 0 ? (
          <ul className={css.noticesFavoritesList}>
            {favoriteNotices.map((noticeItem) => (
              <NoticesItem
                key={noticeItem._id}
                notice={noticeItem}
                favorite={true}
              />
            ))}
          </ul>
        ) : (
          <p className={css.placeholderText}>
            Oops, <span>looks like there aren't any furries</span> on our
            adorable page yet. Do not worry! View your pets on the "find your
            favorite pet" page and add them to your favorites.
          </p>
        ))}

      {activeTab === "viewed" &&
        (viewedNotices.length > 0 ? (
          <ul className={css.noticesFavoritesList}>
            {viewedNotices.map((noticeItem) => (
              <NoticesItem
                key={noticeItem._id}
                notice={noticeItem}
                favorite={false}
              />
            ))}
          </ul>
        ) : (
          <p className={css.placeholderText}>
            Oops, <span>looks like there aren't any furries</span> on our
            adorable page yet. Do not worry! View your pets on the "find your
            favorite pet" page and add them to your favorites.
          </p>
        ))}
    </div>
  );
};

export default MyNotices;
