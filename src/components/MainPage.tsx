import React from "react";
import MainTable from "../components/MainTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import useInitialData from "../hooks/useInitialData";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MainPage: React.FC = () => {
  const { data } = useInitialData();
  const itemsDisplayed = useSelector(
    (state: RootState) => state.itemsDisplayed
  );

  return (
    <div className="page_wrapper">
      <div className="container">
        <SearchBar />
        <MainTable data={itemsDisplayed} />
        {data.length > 0 && (
          <Pagination
            pageLimit={10}
            amountOfPages={Math.ceil(data.length / 10)}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
