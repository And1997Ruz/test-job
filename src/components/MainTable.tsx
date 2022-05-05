import React, { useState } from "react";
import TableHeader from "./TableHeader";
import { Item } from "./../types/index";
import styles from "./MainTable.module.css";
import TableDataSkeleton from "./skeletons/TableDataSkeleton";

interface Props {
  data: Item[];
}

interface Order {
  id: string;
  title: string;
  body: string;
}

const MainTable: React.FC<Props> = (props) => {
  const [sortOrder, setSortOrder] = useState({
    id: "des",
    title: "des",
    body: "des",
  });

  const handleSortOrder = (name: string) => {
    if (name === "id") {
      setSortOrder((prev: Order) => {
        return { ...prev, id: prev["id"] === "des" ? "asc" : "des" };
      });
    }
    if (name === "body") {
      setSortOrder((prev: Order) => {
        return { ...prev, body: prev["body"] === "des" ? "asc" : "des" };
      });
    }
    if (name === "title") {
      setSortOrder((prev: Order) => {
        return { ...prev, title: prev["title"] === "des" ? "asc" : "des" };
      });
    }
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <TableHeader
            name="id"
            title="ID"
            order={sortOrder.id}
            width={100}
            onSort={handleSortOrder}
          />
          <TableHeader
            name="title"
            title="Заголовок"
            order={sortOrder.title}
            onSort={handleSortOrder}
          />
          <TableHeader
            name="body"
            title="Описание"
            order={sortOrder.body}
            onSort={handleSortOrder}
          />
        </tr>
      </thead>
      <tbody>
        {props.data.length === 0 && <TableDataSkeleton />}
        {props.data.map((item: Item, idx: number) => (
          <tr key={idx}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
