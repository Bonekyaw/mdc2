import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import requiredInfoReducer from "@/services/redux/requiredInfoSlice";

export const store = configureStore({
  reducer: {
    requiredInfo: requiredInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
