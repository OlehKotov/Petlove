import React from "react";
import css from "./NewsItem.module.css";

const NewsItem = ({ news }) => {
  return (
    <li className={css.newsItem}>
      <img src={news.imgUrl} alt={news.title} className={css.newsItemImg} />
      <h3 className={css.newsItemHeader}>{news.title}</h3>
      <p className={css.newsItemText}>{news.text}</p>
      <div className={css.newsItemDateWrap}>
        <p className={css.newsItemDate}>{news.date.slice(0, 10)}</p>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className={css.newsItemLink}
        >
          Read more
        </a>
      </div>
    </li>
  );
};

export default NewsItem;
