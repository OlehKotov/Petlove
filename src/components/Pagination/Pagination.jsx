import React from "react";
import css from "./Pagination.module.css";
import sprite from "../../assets/icons/sprite.svg";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo(0, 0);
  };


  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handlePreviousPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 2;

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (startPage === 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className={css.pagination}>
      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        className={css.pageButton}
      >
        <svg width="7" height="12">
          <use xlinkHref={`${sprite}#Vector_black_left`} />
        </svg>
        <svg width="7" height="12">
          <use xlinkHref={`${sprite}#Vector_black_left`} />
        </svg>
      </button>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={css.pageButton}
      >
        <svg width="7" height="12">
          <use xlinkHref={`${sprite}#Vector_black_left`} />
        </svg>
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${css.pageButton} ${
            currentPage === page ? css.active : ""
          }`}
        >
          {page}
        </button>
      ))}
      {totalPages > getPageNumbers()[getPageNumbers().length - 1] && (
        <>
          <span className={css.dots}>...</span>
        </>
      )}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={css.pageButton}
      >
        <svg width="7" height="12">
          <use xlinkHref={`${sprite}#Vector_black_right`} />
        </svg>
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        className={css.pageButton}
      >
        <svg width="7" height="12">
          <use xlinkHref={`${sprite}#Vector_black_right`} />
        </svg>
        <svg width="7" height="12">
          <use xlinkHref={`${sprite}#Vector_black_right`} />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
