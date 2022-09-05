import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const organizationsAdapter = createEntityAdapter({
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
        const loadedOrganizations = responseData.map((mappedOrganization) => {
          mappedOrganization.id = mappedOrganization._id;
          return mappedOrganization;
        });
        return organizationsAdapter.setAll(initialState, loadedOrganizations);
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

    getOrganizationById: builder.query({
      query: (organizationId) => ({
        url: `/api/organizations/${organizationId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "Organization", id: arg.id },
      ],
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
        url: `/api/organizations/${organization.id}`,
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
  useGetOrganizationByIdQuery,
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

export const selectJoinRequestOrganizations = createSelector(
  [selectAllOrganizations, (state, participantId) => participantId],
  (organizations, participantId) =>
    organizations
      .filter((filteredOrganization) =>
        filteredOrganization.joinRequests.includes(participantId)
      )
      .map((mappedOrganization) => mappedOrganization.id)
);

export const selectInvitingOrganizations = createSelector(
  [selectAllOrganizations, (state, participantId) => participantId],
  (organizations, participantId) =>
    organizations
      .filter((filteredOrganization) =>
        filteredOrganization.invites.includes(participantId)
      )
      .map((mappedOrganization) => mappedOrganization.id)
);

export const selectAdminOrganizationIds = createSelector(
  [selectAllOrganizations, (state, adminId) => adminId],
  (organizations, adminId) =>
    organizations
      .filter((filteredOrganization) =>
        filteredOrganization.admins.includes(adminId)
      )
      .map((mappedOrganization) => mappedOrganization.id)
);

export const selectParticipantOrganizationIds = createSelector(
  [selectAllOrganizations, (state, participantId) => participantId],
  (organizations, participantId) =>
    organizations
      .filter((filteredOrganization) =>
        filteredOrganization.members.includes(participantId)
      )
      .map((mappedOrganization) => mappedOrganization.id)
);

export const selectMyOrganizationIds = createSelector(
  [selectAllOrganizations, (state, participantId) => participantId],
  (organizations, participantId) =>
    organizations
      .filter(
        (filteredOrganization) =>
          filteredOrganization.createdBy === participantId ||
          filteredOrganization.admins.includes(participantId) ||
          filteredOrganization.members.includes(participantId)
      )
      .map((mappedOrganization) => mappedOrganization.id)
);
