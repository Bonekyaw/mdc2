import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "@/api";
import { CategoryType, ColorType, SizeType, SampleType } from "@/type";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  categories: CategoryType[];
  colors: ColorType[];
  sizes: SizeType[];
  sample: SampleType[];
  isFetching: boolean;
}

const initialState: initialStateType = {
  categories: [],
  colors: [],
  sizes: [],
  sample: [],
  isFetching: false,
};

export const fetchRequiredInfo = createAsyncThunk(
  "requiredInfo/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await fetchApi("requiredInfo");
    if (!response) {
      return rejectWithValue("Network Connection failed. Please try again.");
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
          colors: ColorType[];
          sizes: SizeType[];
          sample: SampleType[];
        }>
      ) => {
        state.categories = action.payload.categories;
        state.colors = action.payload.colors;
        state.sizes = action.payload.sizes;
        state.sample = action.payload.sample;
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
