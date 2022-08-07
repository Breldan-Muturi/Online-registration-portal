import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => "/api/auth/me",
    }),
  }),
});

export const { useCurrentUserQuery } = userApiSlice;

export const selectCurrentResult = userApiSlice.endpoints.currentUser.select();

export const selectCurrentUser = createSelector(
  selectCurrentResult,
  (currentResult) => currentResult.data
);
