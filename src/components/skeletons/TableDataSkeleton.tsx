import React from "react";
import styles from "./TableDataSkeleton.module.css";

const TableDataSkeleton: React.FC = () => {
  return (
    <div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
    </div>
  );
};

export default TableDataSkeleton;
