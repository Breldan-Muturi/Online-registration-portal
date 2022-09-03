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
      invalidatesTags: (result, error, arg) => [
        { type: "Application", id: arg.id },
      ],
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
  selectEntities: selectAllApplicationsData,
  selectTotal: selectApplicationsTotal,
} = applicationsAdapter.getSelectors(
  (state) => selectApplicationsData(state) ?? initialState
);

export const selectCourseApplicationIds = createSelector(
  [selectAllApplications, (state, courseId) => courseId],
  (applications, courseId) =>
    applications
      .filter(
        (filteredApplication) => filteredApplication.courseId === courseId
      )
      .map((mappedApplication) => mappedApplication.id)
);

export const selectOrganizationApplicationIds = createSelector(
  [selectAllApplications, (state, organizationId) => organizationId],
  (applications, organizationId) =>
    applications
      .filter(
        (filteredApplication) =>
          filteredApplication.organizationId === organizationId
      )
      .map((mappedApplication) => mappedApplication.id)
);

export const selectParticipantApplicationIds = createSelector(
  [selectAllApplications, (state, participantId) => participantId],
  (applications, participantId) =>
    applications
      .filter(
        (filteredApplication) =>
          filteredApplication.participants.includes(participantId) ||
          filteredApplication.createdBy === participantId
      )
      .map((mappedApplication) => mappedApplication.id)
);

export const selectParticipantCourseApplicationIds = createSelector(
  [selectAllApplications, (state, participantCourse) => participantCourse],
  (applications, participantCourse) =>
    applications
      .filter(
        (filteredApplication) =>
          filteredApplication.participants.includes(
            participantCourse.participantId ||
              filteredApplication.createdBy === participantCourse.participantId
          ) && filteredApplication.courseId === participantCourse.courseId
      )
      .map((mappedApplication) => mappedApplication.id)
);
