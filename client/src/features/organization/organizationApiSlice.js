import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const organizationsAdapter = createEntityAdapter({
  selectId: (organization) => organization._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = organizationsAdapter.getInitialState();

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => "/api/organizations",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        return organizationsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Organization", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Organization", id })),
          ];
        } else return [{ type: "Organization", id: "LIST" }];
      },
    }),

    createOrganization: builder.mutation({
      query: (organization) => ({
        url: `/api/organizations/`,
        method: "POST",
        body: organization,
      }),
      invalidatesTags: [{ type: "Organization", id: "LIST" }],
    }),

    updateOrganization: builder.mutation({
      query: (organization) => ({
        url: `/api/organizations/${organization._id}`,
        method: "PATCH",
        body: organization,
      }),
      invalidatesTags: [{ type: "Organization", id: "LIST" }],
    }),

    deleteOrganization: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/organizations/${_id}`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: [{ type: "Organization", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApiSlice;

export const selectOrganizationsResult =
  organizationApiSlice.endpoints.getOrganizations.select();

export const selectOrganizationsData = createSelector(
  selectOrganizationsResult,
  (organizationsResult) => organizationsResult.data
);

export const {
  selectAll: selectAllOrganizations,
  selectById: selectOrganizationById,
  selectIds: selectOrganizationIds,
} = organizationsAdapter.getSelectors(
  (state) => selectOrganizationsData(state) ?? initialState
);
