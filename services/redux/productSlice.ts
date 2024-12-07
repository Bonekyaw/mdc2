import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchApi } from "@/api";
import { ProductType } from "@/type";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PayloadType {
  data: ProductType[];
}

interface UpdatePayloadType {
  productId: number;
  userId: number | null;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (select: number, { rejectWithValue }) => {
    const response = await fetchApi(`products?limit=10&category=${select}`);
    // if (response.data.length === 0) {
    //   return rejectWithValue("No Product Found.");
    // }
    if (!response) {
      return rejectWithValue("Network connection failed. Please try again!");
    }
    if (response.error === "Error_Attack") {
      // Error_Attack - Must Log Out
      return rejectWithValue(response.error);
    }
    if (response.error) {
      return rejectWithValue(response.message);
    }

    return response;
  }
);

export const updateFavouriteApi = createAsyncThunk(
  "products/updateOne",
  async (
    data: { productId: number; favourite: boolean },
    { rejectWithValue }
  ) => {
    const response = await fetchApi("products/favourite-toggle", "POST", data);
    if (!response) {
      return rejectWithValue("Network connection failed. Please try again!");
    }
    if (response.error === "Error_Attack") {
      // Error_Attack - Must Log Out
      return rejectWithValue(response.error);
    }
    if (response.error) {
      return rejectWithValue(response.message);
    }

    return response;
  }
);

export const productsAdapter = createEntityAdapter<ProductType>();

const initialState = productsAdapter.getInitialState({
  loading: false,
  error: false,
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // removeProduct: productsAdapter.removeOne,
    updateProduct: productsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<PayloadType>) => {
        productsAdapter.setAll(state, action.payload.data);
        state.error = false;
        state.loading = false;
      }
    );
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(
      updateFavouriteApi.fulfilled,
      (state, action: PayloadAction<UpdatePayloadType>) => {
        productsAdapter.updateOne(state, {
          id: action.payload.productId,
          changes:
            action.payload.userId !== null
              ? { users: [{ id: action.payload.userId }] }
              : { users: [] },
        });
      }
    );
  },
});

const reducer = productSlice.reducer;
export default reducer;

export const { updateProduct } = productSlice.actions;

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: any) => state.products);
