import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "@/api";
import { CategoryType } from "@/type";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  categories: CategoryType[];
  isFetching: boolean;
}

const initialState: initialStateType = {
  categories: [],
  isFetching: false,
};

export const fetchRequiredInfo = createAsyncThunk(
  "requiredInfo/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await fetchApi("requiredInfo");
    if (!response) {
      return rejectWithValue("Network Connection failed. Please try again.");
    } else if (response.error) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

const requiredInfoSlice = createSlice({
  name: "requiredInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRequiredInfo.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(
      fetchRequiredInfo.fulfilled,
      (
        state,
        action: PayloadAction<{
          categories: CategoryType[];
        }>
      ) => {
        state.categories = action.payload.categories;
        state.isFetching = false;
      }
    );
    builder.addCase(fetchRequiredInfo.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const {} = requiredInfoSlice.actions;

export default requiredInfoSlice.reducer;
