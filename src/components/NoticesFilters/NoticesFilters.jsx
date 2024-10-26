import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import SearchField from "../SearchField/SearchField";
import {
  fetchCategories,
  fetchSex,
  fetchSpecies,
  fetchLocations,
  fetchAllLocations,
} from "../../redux/notices/noticesOps";
import css from "./NoticesFilters.module.css";
import { selectFiltersLocation, selectNotices } from "../../redux/selectors";
import {
  clearLocations,
  updateFilters,
} from "../../redux/notices/noticesSlice";
import AsyncSelect from "react-select/async";
import sprite from "../../assets/icons/sprite.svg";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "30px",
    borderColor: "#ccc",
    boxShadow: "none",
    minHeight: "42px",
    height: "42px",
    width: "143px",
    border: "none",
    paddingRight: "40px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "42px",
    padding: "0 12px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "42px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0",
    paddingRight: "12px",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "129%",
    letterSpacing: "-0.03em",
    color: "#262626",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "15px",
    border: "none",
    marginTop: "4px",
    width: "143px",
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: "15px",
    padding: "0",
  }),
  option: (provided, state) => ({
    ...provided,
    padding: "8px",
    color: "rgba(38, 38, 38, 0.6)",
    cursor: "pointer",
    backgroundColor: state.isSelected ? "transparent" : "white",
    "&:hover": {
      color: "#f6b83d",
    },
  }),
};

const NoticesFilters = () => {
  const dispatch = useDispatch();
  const { categories, sex, species, filters } = useSelector(selectNotices);
  const locations = useSelector(selectFiltersLocation);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const loadOptions = useCallback(
    (inputValue, callback) => {
      if (!inputValue) {
        dispatch(fetchAllLocations()).then((action) => {
          const options = action.payload.map((location) => ({
            value: location._id,
            label: `${location.cityEn}, ${location.stateEn}, ${location.countyEn}`,
          }));
          callback(options);
        });
      } else {
        dispatch(fetchLocations(inputValue)).then((action) => {
          const options = Array.isArray(action.payload)
            ? action.payload.map((location) => ({
                value: location._id,
                label: `${location.cityEn}, ${location.stateEn}, ${location.countyEn}`,
              }))
            : [];
          callback(options);
        });
      }
    },
    [dispatch]
  );

  const handleInputChange = (newValue) => {
    dispatch(clearLocations());
    return newValue;
  };

  const handleLocationChange = (option) => {
    setSelectedLocation(option);
    handleChange("locationId", option ? option.value : "");
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSex());
    dispatch(fetchSpecies());
  }, [dispatch]);

  const handleSearch = (keyword) => {
    dispatch(updateFilters({ ...filters, keyword }));
  };

  // const handleChange = (name, value) => {
  //   dispatch(updateFilters({ ...filters, [name]: value }));
  // };

  const handleChange = useCallback(
    (name, value) => {
      dispatch(updateFilters({ ...filters, [name]: value }));
    },
    [dispatch, filters]
  );

  const handleSortChange = (event) => {
    const { value } = event.target;

    if (value === "popular") {
      handleChange("byPopularity", false);
    } else if (value === "unpopular") {
      handleChange("byPopularity", true);
    } else {
      handleChange("sortBy", value);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }));

  const sexOptions = sex.map((sex) => ({
    value: sex,
    label: sex.charAt(0).toUpperCase() + sex.slice(1),
  }));

  const speciesOptions = species.map((species) => ({
    value: species,
    label: species.charAt(0).toUpperCase() + species.slice(1),
  }));

  const locationOptions = locations.map((location) => ({
    value: location._id,
    label: `${location.cityEn}, ${location.stateEn}, ${location.countyEn}`,
  }));

  return (
    <div className={css.filters}>
      <div className={css.filtersCont}>
        <div className={css.filtersWrap}>
          <SearchField onSearch={handleSearch} variant="filtersBlock" />

          <div className={css.filtersCatandSex}>
            <div className={css.inputWrap}>
              <Select
                options={categoryOptions}
                onChange={(option) => handleChange("category", option.value)}
                placeholder="Category"
                styles={customStyles}
                components={{
                  DropdownIndicator: () => (
                    <svg className={css.icon} width="18px" height="18px">
                      <use xlinkHref={`${sprite}#down`} />
                    </svg>
                  ),
                }}
              />
            </div>
            <div className={css.inputWrap}>
              <Select
                options={sexOptions}
                onChange={(option) => handleChange("sex", option.value)}
                placeholder="By gender"
                classNamePrefix="testSelect"
                styles={customStyles}
                components={{
                  DropdownIndicator: () => (
                    <svg className={css.icon} width="18px" height="18px">
                      <use xlinkHref={`${sprite}#down`} />
                    </svg>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <div className={css.filtersWrap}>
          <Select
            options={speciesOptions}
            onChange={(option) => handleChange("species", option.value)}
            placeholder="By type"
            className={`${css.speciesOptions} testSelect`}
            classNamePrefix="testSelect"
            styles={{
              ...customStyles,
              control: (provided) => ({
                ...customStyles.control(provided),
                width: "295px",
              }),
              menu: (provided) => ({
                ...customStyles.menu(provided),
                width: "295px",
              }),
            }}
            components={{
              DropdownIndicator: () => (
                <svg className={css.icon} width="18px" height="18px">
                  <use xlinkHref={`${sprite}#down`} />
                </svg>
              ),
            }}
          />

          <AsyncSelect
            isClearable
            cacheOptions
            defaultOptions={locationOptions}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={handleLocationChange}
            value={selectedLocation}
            onFocus={() => loadOptions("", () => {})}
            placeholder="Location"
            className={`${css.speciesOptions} testSelect`}
            classNamePrefix="testSelect"
            styles={{
              ...customStyles,
              control: (provided) => ({
                ...customStyles.control(provided),
                width: "295px",
              }),
              menu: (provided) => ({
                ...customStyles.menu(provided),
                width: "295px",
              }),
            }}
            components={{
              DropdownIndicator: () => (
                <svg className={css.icon} width="18px" height="18px">
                  <use xlinkHref={`${sprite}#search`} />
                </svg>
              ),
              ClearIndicator: () => (
                <svg
                  className={css.iconX}
                  width="18px"
                  height="18px"
                  onClick={() => handleLocationChange(null)}
                >
                  <use xlinkHref={`${sprite}#black-x`} />
                </svg>
              ),
            }}
          />
        </div>
      </div>

      <div className={css.line}></div>

      <div className={css.sortFilters}>
        <input
          type="radio"
          id="popular"
          name="sort"
          value="popular"
          onChange={handleSortChange}
          className={css.sortInput}
        />
        <label htmlFor="popular" className={css.sortFiltersLabel}>
          Popular
          <span>
            <svg width="18px" height="18px">
              <use xlinkHref={`${sprite}#x`} />
            </svg>
          </span>
        </label>

        <input
          type="radio"
          id="unpopular"
          name="sort"
          value="unpopular"
          onChange={handleSortChange}
          className={css.sortInput}
        />
        <label htmlFor="unpopular" className={css.sortFiltersLabel}>
          Unpopular
          <span>
            <svg width="18px" height="18px">
              <use xlinkHref={`${sprite}#x`} />
            </svg>
          </span>
        </label>

        <input
          type="radio"
          id="cheap"
          name="sort"
          value="cheap"
          onChange={handleSortChange}
          className={css.sortInput}
        />
        <label htmlFor="cheap" className={css.sortFiltersLabel}>
          Cheap
          <span>
            <svg width="18px" height="18px">
              <use xlinkHref={`${sprite}#x`} />
            </svg>
          </span>
        </label>

        <input
          type="radio"
          id="expensive"
          name="sort"
          value="expensive"
          onChange={handleSortChange}
          className={css.sortInput}
        />
        <label htmlFor="expensive" className={css.sortFiltersLabel}>
          Expensive
          <span>
            <svg width="18px" height="18px">
              <use xlinkHref={`${sprite}#x`} />
            </svg>
          </span>
        </label>
      </div>
    </div>
  );
};

export default NoticesFilters;
