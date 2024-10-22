import React, { useState, useEffect } from "react";
import NewsItem from "../NewsItem/NewsItem";
import Pagination from "../Pagination/Pagination";
import css from "./NewsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNewsError,
  selectNewsLoading,
  selectNews,
  selectNewsTotalPages,
} from "../../redux/selectors";
import { fetchNews } from "../../redux/news/newsOps";

const NewsList = ({ keyword }) => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const loading = useSelector(selectNewsLoading);
  const error = useSelector(selectNewsError);
  const totalPages = useSelector(selectNewsTotalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  useEffect(() => {
    dispatch(fetchNews({ keyword, page: currentPage, limit }));
  }, [keyword, currentPage, limit, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={css.newsListWrap}>
      <ul className={css.newsList}>
        {news.map((newsItem) => (
          <NewsItem key={newsItem._id} news={newsItem} />
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

export default NewsList;
