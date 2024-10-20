import React, { useState } from "react";
import sprite from "../../assets/icons/sprite.svg";
import css from "./SearchField.module.css";
import clsx from "clsx";

const SearchField = ({ onSearch, variant }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <div className={css.inputWrap}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className={clsx(css.searchInput, css[variant])}
        />
        <button type="submit" className={css.searchButton}>
          <svg width="18" height="18">
            <use xlinkHref={`${sprite}#search`} />
          </svg>
        </button>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={css.clearButton}
          >
            <svg width="14" height="14">
              <use xlinkHref={`${sprite}#black-x`} />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchField;
