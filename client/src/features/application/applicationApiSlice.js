import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const applicationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = applicationsAdapter.getInitialState();

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query({
      query: () => "/api/applications",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedApplications = responseData.map((mappedApplication) => {
          mappedApplication.id = mappedApplication._id;
          return mappedApplication;
        });
        return applicationsAdapter.setAll(initialState, loadedApplications);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Application", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Application", id })),
          ];
        } else return [{ type: "Application", id: "LIST" }];
      },
    }),
    createApplication: builder.mutation({
      query: (application) => ({
        url: "/api/applications",
        method: "POST",
        body: application,
      }),
      invalidatesTags: [{ type: "Application", id: "LIST" }],
    }),
    updateApplication: builder.mutation({
      query: (application) => ({
        url: `/api/applications/${application.id}`,
        method: "PATCH",
        body: application,
      }),
      invalidatesTags: [{ type: "Application", id: "LIST" }],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
} = applicationApiSlice;

export const selectApplicationsResult =
  applicationApiSlice.endpoints.getApplications.select();
export const selectApplicationsData = createSelector(
  selectApplicationsResult,
  (applicationsResult) => applicationsResult.data
);

export const {
  selectAll: selectAllApplications,
  selectById: selectApplicationsById,
  selectIds: selectApplicationIds,
} = applicationsAdapter.getSelectors(
  (state) => selectApplicationsData(state) ?? initialState
);