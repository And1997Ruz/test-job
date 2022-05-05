import axios from "axios";
import { Dispatch } from "redux";
import { setItems } from "./itemsReducer";

export const fetchInitialData = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const newData = response.data;
    dispatch(setItems(newData));
  };
};
