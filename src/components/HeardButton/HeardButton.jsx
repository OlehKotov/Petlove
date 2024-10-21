import sprite from "../../assets/icons/sprite.svg";
import css from "./HeardButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserNoticesFavorites } from "../../redux/selectors";
import { useAuth } from "../../hooks/use-auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  addFavoriteNotice,
  deleteFavoriteNotice,
} from "../../redux/users/userOps";

const HeardButton = ({ noticeId }) => {
  const dispatch = useDispatch();
  const favoriteNotice = useSelector(selectUserNoticesFavorites);
  const { isAuth } = useAuth();

  const isFavorite = favoriteNotice.includes(noticeId);

  const [isClicked, setIsClicked] = useState(isFavorite);

  useEffect(() => {
    setIsClicked(isFavorite);
  }, [isFavorite]);

  const handleClick = async () => {
    try {
      if (isClicked) {
        await dispatch(deleteFavoriteNotice(noticeId)).unwrap();
        toast.success("Notice removed from favorites");
      } else {
        await dispatch(addFavoriteNotice(noticeId)).unwrap();
        toast.success("Notice added to favorites");
      }
      setIsClicked(!isClicked);
    } catch (error) {
      console.error("Error handling favorite notice:", error);
      toast.error("An error occurred while updating favorites.");
    }
  };

  const handleButtonClick = () => {
    if (!isAuth) {
      toast.error("Please Log in and try again.");
      return;
    }
    handleClick();
  };

  return (
    <button
      className={`${css.noticeFavorite} ${
        isClicked ? css.noticeFavoriteActive : ""
      }`}
      type="button"
      onClick={handleButtonClick}
    >
      <svg className={css.noticeItemPopularityIcon} width="16" height="16">
        <use xlinkHref={`${sprite}#heart`} />
      </svg>
    </button>
  );
};

export default HeardButton;
