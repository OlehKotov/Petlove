import sprite from "../../assets/icons/sprite.svg";
import css from "./TrashButton.module.css";
import { toast } from "react-toastify";
import { deleteFavoriteNotice } from "../../redux/users/userOps";
import { useDispatch } from "react-redux";

const TrashButton = ({ noticeId }) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    try {
      await dispatch(deleteFavoriteNotice(noticeId)).unwrap();
      toast.success("Notice added to favorites");
    } catch (error) {
      console.error("Error handling favorite notice:", error);
      toast.error("An error occurred while updating favorites.");
    }
  };

  return (
    <button
      className={css.noticeFavorite}
      type="button"
      onClick={handleButtonClick}
    >
      <svg className={css.noticeItemPopularityIcon} width="16" height="16">
        <use xlinkHref={`${sprite}#trash`} />
      </svg>
    </button>
  );
};

export default TrashButton;
