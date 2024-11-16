import { configureStore } from "@reduxjs/toolkit";
import requiredInfoReducer from "@/services/redux/requiredInfoSlice";

export const store = configureStore({
  reducer: {
    requiredInfo: requiredInfoReducer,
  },
});
