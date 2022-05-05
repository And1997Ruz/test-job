import { createSlice } from "@reduxjs/toolkit";
import { Item } from "./../../types/index";

const initialState: Item[] = [];

interface SetItemsAction {
  type: string;
  payload: Item[];
}

interface SearchItemsAction {
  type: string;
  payload: string;
}

interface SetDisplayedItemsAction {
  type: string;
  payload: {
    items: Item[];
    pageLimit: number;
    pageNumber: number;
  };
}

interface SortItemsAction {
  type: string;
  payload: {
    column: string;
    order: string;
  };
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state: Item[], action: SetItemsAction) {
      return action.payload;
    },
    searchItems(state: Item[], action: SearchItemsAction) {
      if (!action.payload) return state;
      const query = action.payload;
      const filtered = state.filter(
        (item: Item) => item.title.includes(query) || item.body.includes(query)
      );
      return filtered;
    },
    sortItems(state: Item[], action: SortItemsAction) {
      const { column, order } = action.payload;

      if (column !== "id" && column !== "title" && column !== "body")
        return state;

      if (order === "asc") {
        state.sort((a: Item, b: Item) => (a[column] < b[column] ? 1 : -1));
      }
      if (order === "des") {
        state.sort((a: Item, b: Item) => (a[column] > b[column] ? 1 : -1));
      }
      return state;
    },
  },
});

const itemsDisplayedSlice = createSlice({
  name: "itemsDisplayed",
  initialState,
  reducers: {
    setDisplayedItems(state: Item[], action: SetDisplayedItemsAction) {
      const { pageLimit, pageNumber, items } = action.payload;
      const startIdx = (pageNumber - 1) * pageLimit;
      const endIdx = startIdx + pageLimit;
      const displayedItems = items.slice(startIdx, endIdx);
      return displayedItems;
    },
  },
});

export const itemsReducer = itemsSlice.reducer;
export const { setItems, searchItems, sortItems } = itemsSlice.actions;

export const itemsDisplayedReducer = itemsDisplayedSlice.reducer;
export const { setDisplayedItems } = itemsDisplayedSlice.actions;
