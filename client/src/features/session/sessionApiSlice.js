import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const sessionsAdapter = createEntityAdapter({
  selectId: (session) => session._id,
  sortComparer: (a, b) => b.startDate.localeCompare(a.startDate),
});

const initialState = sessionsAdapter.getInitialState();

export const sessionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => "/api/sessions",
      transformResponse: (responseData) => {
        return sessionsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, args) => [
        { type: "Session", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Session", id })),
      ],
    }),

    createSession: builder.mutation({
      query: (session) => ({
        url: `/api/sessions/`,
        method: "POST",
        body: session,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Session", id: "LIST" },
      ],
    }),

    updateSession: builder.mutation({
      query: (session) => ({
        url: `/api/sessions/${session._id}`,
        method: "PUT",
        body: session,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Session", id: arg.id },
      ],
    }),

    deleteSession: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/sessions/${_id}`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Session", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionApiSlice;

export const selectSessionsResult =
  sessionApiSlice.endpoints.getSessions.select();

export const selectSessionsData = createSelector(
  selectSessionsResult,
  (sessionsResult) => sessionsResult.data
);

export const {
  selectAll: selectAllSessions,
  selectById: selectSessionsById,
  selectIds: selectSessionIds,
} = sessionsAdapter.getSelectors(
  (state) => selectSessionsData(state) ?? initialState
);
