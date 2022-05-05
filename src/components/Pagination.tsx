import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { setCurrentPage } from "../store/currentPageSlice/currentPageReducer";
import { setDisplayedItems } from "../store/itemsSlice/itemsReducer";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import styles from "./Pagination.module.css";

interface Props {
  pageLimit: number;
  amountOfPages: number;
}

const Pagination: React.FC<Props> = ({ amountOfPages, pageLimit }) => {
  const { pageNum } = useParams();
  const initialStartingPage = pageNum ? parseInt(pageNum) : 1;
  const [startingPage, setStartingPage] = useState(
    initialStartingPage > 5 ? 6 : 1
  );
  const [pagesArrayDisplayed, setPagesArrayDisplayed] = useState<number[]>([]);
  const currentPage = useSelector((state: RootState) => state.currentPage);

  const getPages = useCallback(() => {
    const pages = _.range(startingPage, startingPage + 5);
    return pages.filter((page: number) => page <= amountOfPages);
  }, [amountOfPages, startingPage]);

  useEffect(() => {
    setPagesArrayDisplayed(getPages());
  }, [currentPage, getPages]);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items);

  useEffect(() => {
    if (pageNum) {
      dispatch(setCurrentPage(parseInt(pageNum)));
      dispatch(
        setDisplayedItems({
          pageLimit: pageLimit,
          pageNumber: parseInt(pageNum),
          items,
        })
      );
    }
  }, [pageNum, dispatch, pageLimit, items]);

  const navigate = useNavigate();

  const handlePageSelect = (page: number) => {
    navigate(`/page/${page}`);
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  };

  const handleSelectPrevPage = () => {
    if (currentPage === 1) return;
    handlePageSelect(currentPage - 1);
    if (currentPage === pagesArrayDisplayed[0]) {
      setStartingPage((prev) => prev - 5);
    }
  };

  const handleSelectNextPage = () => {
    if (currentPage === amountOfPages) return;
    handlePageSelect(currentPage + 1);

    if (currentPage === pagesArrayDisplayed[pagesArrayDisplayed.length - 1]) {
      setStartingPage((prev) => prev + 5);
    }
  };

  if (amountOfPages <= 1) return <div></div>;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.control} ${currentPage === 1 && styles.disabled}`}
        onClick={handleSelectPrevPage}
      >
        Назад
      </button>
      <div className={styles.pageNumbersWrapper}>
        {pagesArrayDisplayed.map((page: number) => (
          <button
            key={page}
            className={`${styles.pageNumber} ${
              page === currentPage && styles.active
            }`}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={`${styles.control} ${
          currentPage === amountOfPages && styles.disabled
        }`}
        onClick={handleSelectNextPage}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
