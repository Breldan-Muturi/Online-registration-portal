import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const completedCoursesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = completedCoursesAdapter.getInitialState();

export const completedCoursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedCourses: builder.query({
      query: () => "api/completions/",
      validateStatus: (response, result) => {
        return response.status !== 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedCompletedCourses = responseData.map(
          (mappedCompletedCourse) => {
            mappedCompletedCourse.id = mappedCompletedCourse._id;
            return mappedCompletedCourse;
          }
        );
        return completedCoursesAdapter.setAll(
          initialState,
          loadedCompletedCourses
        );
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "CompletedCourse", id: "LIST" },
            ...result.ids.map((id) => ({ type: "CompletedCourse", id })),
          ];
        } else return [{ type: "CompletedCourse", id: "LIST" }];
      },
    }),

    createCompletedCourse: builder.mutation({
      query: (completedCourse) => ({
        url: "/api/completions",
        method: "POST",
        body: completedCourse,
      }),
      invalidateTags: [{ type: "CompletedCourses", id: "LIST" }],
    }),

    updateCompletedCourse: builder.mutation({
      query: (completedCourse, completionId) => ({
        url: `/api/completions/${completionId}`,
        method: "PATCH",
        body: completedCourse,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "CompletedCourse", id: "LIST" },
        { type: "CompletedCourse", id: arg.id },
      ],
    }),

    deleteCompletedCourse: builder.mutation({
      query: (completionId) => ({
        url: `/api/completions/${completionId}`,
        method: "DELETE",
        body: completionId,
      }),
      invalidateTags: (result, error, arg) => [
        { type: "CompletedCourse", id: "LIST" },
        { type: "CompletedCourse", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCompletedCoursesQuery,
  useCreateCompletedCourseMutation,
  useUpdateCompletedCourseMutation,
  useDeleteCompletedCourseMutation,
} = completedCoursesApiSlice;

export const selectCompletedCoursesResult =
  completedCoursesApiSlice.endpoints.getCompletedCourses.select();

const selectedCompletedCoursesData = createSelector(
  selectCompletedCoursesResult,
  (completedCourseResult) => completedCourseResult.data
);

export const {
  selectAll: selectAllCompletedCourses,
  selectById: selectCompletedCourseById,
  selectIds: selectCompletedCourseIds,
} = completedCoursesAdapter.getSelectors(
  (state) => selectedCompletedCoursesData(state) ?? initialState
);
