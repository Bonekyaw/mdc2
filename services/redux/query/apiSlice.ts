import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefresh } from "@/services/redux/query/baseQueryWithRefresh";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh, //staggeredBaseQuery,
  tagTypes: ["Product"], // ["User", "Products", "Other"]
  endpoints: (builder) => ({}),
});
