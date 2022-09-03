import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const topicsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = topicsAdapter.getInitialState();

export const topicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => "/api/topics",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedTopics = responseData.map((mappedTopic) => {
          mappedTopic.id = mappedTopic._id;
          return mappedTopic;
        });
        return topicsAdapter.setAll(initialState, loadedTopics);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Topic", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Topic", id })),
          ];
        } else return [{ type: "Topic", id: "LIST" }];
      },
    }),

    getTopicsByCourseId: builder.query({
      query: (courseId) => `/api/topics/course/${courseId}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedTopicsByCourseId = responseData.map((mappedTopic) => {
          mappedTopic.id = mappedTopic._id;
          return mappedTopic;
        });
        return topicsAdapter.setAll(initialState, loadedTopicsByCourseId);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Topic", id: "PARTIAL-LIST" },
            ...result.ids.map((id) => ({ type: "Topic", id })),
          ];
        } else return [{ type: "Topic", id: "PARTIAL-LIST" }];
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
  useGetTopicsByCourseIdQuery,
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
