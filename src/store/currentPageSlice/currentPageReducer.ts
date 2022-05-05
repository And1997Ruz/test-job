import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

interface Action {
  type: string;
  payload: number;
}

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    setCurrentPage(state: number, action: Action) {
      return action.payload;
    },
  },
});

export default currentPageSlice.reducer;
export const { setCurrentPage } = currentPageSlice.actions;
