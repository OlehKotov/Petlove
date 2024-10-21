import React, { useEffect, useState } from "react";
import css from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../../redux/notices/noticesOps";
import {
  selectFilters,
  selectNoticesItems,
  selectNoticesTotalPages,
} from "../../redux/selectors";
import Pagination from "../Pagination/Pagination";

const NoticesList = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectNoticesItems);
  const filters = useSelector(selectFilters);
  const totalPages = useSelector(selectNoticesTotalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  useEffect(() => {
    dispatch(fetchNotices({ filters, page: currentPage, limit }));
  }, [filters, currentPage, limit, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ul className={css.noticesList}>
        {Array.isArray(items.results) &&
          items.results.map((noticeItem) => (
            <NoticesItem key={noticeItem._id} notice={noticeItem} />
          ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default NoticesList;
