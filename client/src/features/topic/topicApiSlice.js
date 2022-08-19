import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const topicsAdapter = createEntityAdapter({
  selectId: (topic) => topic._id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = topicsAdapter.getInitialState();

export const topicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => "/api/topics",
      transformResponse: (res) => topicsAdapter.setAll(initialState, res),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Topic", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Topic", id })),
          ];
        } else return [{ type: "Topic", id: "LIST" }];
      },
    }),

    listTopics: builder.query({
      query: (page = 1) => `/api/topics/?page=${page}`,
      transformResponse: (res) => topicsAdapter.setAll(initialState, res),
    }),

    createTopic: builder.mutation({
      query: (topic) => ({
        url: "/api/topics",
        method: "POST",
        body: topic,
      }),
      invalidatesTags: [{ type: "Topic", id: "LIST" }],
    }),

    deleteTopic: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/topics/${_id}`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: [{ type: "Topic", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useListTopicsQuery,
  useCreateTopicMutation,
  useDeleteTopicMutation,
} = topicApiSlice;

export const selectTopicsResult = topicApiSlice.endpoints.getTopics.select();

export const selectTopicsData = createSelector(
  selectTopicsResult,
  (topicsResult) => topicsResult.data
);

export const {
  selectAll: selectAllTopics,
  selectById: selectTopicById,
  selectIds: selectTopicIds,
} = topicsAdapter.getSelectors(
  (state) => selectTopicsData(state) ?? initialState
);

export const selectTopicsByCourse = createSelector(
  [selectAllTopics, (state, courseId) => courseId],
  (topics, courseId) =>
    topics.filter((filteredTopic) => filteredTopic.courseId === courseId)
);

export const filteredTopics = createSelector(
  [selectAllTopics, (state, selectedTopicIds) => selectedTopicIds],
  (topics, selectedTopicIds) =>
    topics.filter((filteredTopic) =>
      selectedTopicIds.includes(filteredTopic._id)
    )
);
