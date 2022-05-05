import { configureStore } from "@reduxjs/toolkit";
import { itemsReducer } from "./itemsSlice/itemsReducer";
import { itemsDisplayedReducer } from "./itemsSlice/itemsReducer";
import currentPageReducer from "./currentPageSlice/currentPageReducer";

const rootReducer = {
  items: itemsReducer,
  itemsDisplayed: itemsDisplayedReducer,
  currentPage: currentPageReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export * as itemsActions from "./itemsSlice/itemsActions";
