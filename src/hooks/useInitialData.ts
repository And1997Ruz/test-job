import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store";
import { RootState } from "../store";
import { bindActionCreators } from "redux";

const useInitialData = () => {
  const data = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();
  const { fetchInitialData } = useMemo(
    () => bindActionCreators(itemsActions, dispatch),
    [dispatch]
  );

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return { data };
};

export default useInitialData;
