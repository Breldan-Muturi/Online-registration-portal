import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const coursesAdapter = createEntityAdapter({
  selectId: (course) => course._id,
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

const initialState = coursesAdapter.getInitialState();

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/api/courses",
      transformResponse: (res) => coursesAdapter.setAll(initialState, res),
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Course", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Course", id })),
          ];
        } else return [{ type: "Course", id: "LIST" }];
      },
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/api/courses/${courseId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Course", id: arg.id }],
    }),

    listCourses: builder.query({
      query: (page = 1) => `/api/courses/?page=${page}`,
      transformResponse: (res) => coursesAdapter.setAll(initialState, res),
      providesTags: (result, error, page) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Course", id })),
              { type: "Course", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Course", id: "PARTIAL-LIST" }],
    }),

    createCourse: builder.mutation({
      query: (course) => ({
        url: "/api/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),

    updateCourse: builder.mutation({
      query: ({ courseData, courseId }) => ({
        url: `/api/courses/${courseId}`,
        method: "PATCH",
        body: courseData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Course", id: arg.id }],
    }),

    deleteCourse: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/courses/${_id}`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Course", id: arg.id },
        { type: "Course", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useListCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApiSlice;

export const selectCoursesResult = courseApiSlice.endpoints.getCourses.select();

export const selectCoursesData = createSelector(
  selectCoursesResult,
  (coursesResult) => coursesResult.data
);

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCourseIds,
} = coursesAdapter.getSelectors(
  (state) => selectCoursesData(state) ?? initialState
);

export const selectOtherCourses = createSelector(
  [selectAllCourses, (state, courseId) => courseId],
  (courses, courseId) =>
    courses.filter((filteredCourse) => filteredCourse._id !== courseId)
);
