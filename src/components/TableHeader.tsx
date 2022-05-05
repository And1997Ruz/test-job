import React from "react";
import styles from "./TableHeader.module.css";
import { useDispatch } from "react-redux";
import { sortItems } from "../store/itemsSlice/itemsReducer";

interface Props {
  title: string;
  name: string;
  order: string;
  width?: number;
  onSort: (name: string) => void;
}

const TableHeader: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const handleSort = (name: string) => {
    dispatch(
      sortItems({ column: name, order: props.order === "des" ? "asc" : "des" })
    );
    props.onSort(props.name);
  };
  return (
    <th style={{ width: props.width }}>
      <div className={styles.table_header_wrapper}>
        <p>{props.title}</p>
        <span
          className={`${styles.chevron} ${
            props.order === "des" && styles.bottom
          }`}
          onClick={() => handleSort(props.name)}
        ></span>
      </div>
    </th>
  );
};

export default TableHeader;
