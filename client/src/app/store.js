import { configureStore } from "@reduxjs/toolkit";
import empReducer from "../Features/crudSlice";

export default configureStore({
  reducer: {
    emps: empReducer,
  },
});
