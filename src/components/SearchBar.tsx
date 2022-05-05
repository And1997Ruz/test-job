import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "./icons/SearchIcon";
import { useDispatch } from "react-redux";
import { searchItems } from "../store/itemsSlice/itemsReducer";
import { bindActionCreators } from "redux";
import { itemsActions } from "../store";
import { useNavigate } from "react-router-dom";
import { setCurrentPage } from "../store/currentPageSlice/currentPageReducer";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fetchInitialData } = bindActionCreators(itemsActions, dispatch);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (inputValue) {
      dispatch(searchItems(inputValue));
    }
    if (!inputValue) {
      fetchInitialData();
    }
    navigate("/page/1");
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Поиск"
        className={styles.searchInput}
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchIcon handleClick={handleSearchSubmit} />
    </div>
  );
};

export default SearchBar;
