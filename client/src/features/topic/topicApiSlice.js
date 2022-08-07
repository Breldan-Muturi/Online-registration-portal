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
      providesTags: (result, error, arg) => [
        { type: "Topic", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Topic", id })),
        console.log({ ...result.ids }),
      ],
    }),

    listTopics: builder.query({
      query: (page = 1) => `/api/topics/?page=${page}`,
      transformResponse: (res) => topicsAdapter.setAll(initialState, res),
      providesTags: (result, error, page) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Topic", id })),
              { type: "Topic", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Topic", id: "PARTIAL-LIST" }],
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
      invalidatesTags: (result, error, arg) => [
        { type: "Topic", id: arg.id },
        { type: "Topic", id: "PARTIAL-LIST" },
      ],
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
