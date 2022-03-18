import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8080";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get Categories
    getCategories: builder.query({
      // get:  http://localhost:8080/api/categories
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),

    // get labels
    getLabels: builder.query({
      // get:  http://localhost:8080/api/labels
      query: () => "/api/labels",
      providesTags: ["transaction"],
    }),

    // add new transaction
    addTransaction: builder.mutation({
      // post:  http://localhost:8080/api/transaction
      query: (transactionData) => ({
        url: "/api/transaction",
        method: "POST",
        body: transactionData,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete transaction
    deleteTransaction: builder.mutation({
      // delete: http://localhost:8080/api/transaction
      query: (transactionId) => ({
        url: "/api/transaction",
        method: "DELETE",
        body: transactionId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
