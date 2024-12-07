import { apiSlice } from "@/services/redux/query/apiSlice";
import type { ProductType } from "@/type";

interface FavouriteResponse {
  productId: number;
  userId: number | null;
}

interface FavouriteReq {
  productId: number;
  favourite: boolean;
}

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<ProductType, number>({
      query: (id: number) => ({ url: `products/${id}` }),
      providesTags: ["Product"],
    }),
    updateProduct: build.mutation<FavouriteResponse, FavouriteReq>({
      query(body) {
        return {
          url: "products/favourite-toggle",
          method: "POST",
          body,
        };
      },
      // invalidatesTags: ["Product"],
      // invalidatesTags: (result: any, error, arg) => [
      //   { type: "Product" as const, id: arg.id },
      // ],
      async onQueryStarted(
        { productId, favourite },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
          extendedApi.util.updateQueryData("getProduct", productId, (draft) => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const product = draft;
            if (product) product.users = favourite ? [{ id: 1 }] : [];
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
  // overrideExisting: false,
});

export const { useGetProductQuery, useUpdateProductMutation } = extendedApi;
