import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toISOString(),
  courseId: "",
};

export const completedCourseSlice = createSlice({
  name: "completedCourse",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    resetUpdate: (state, action) => {
      const { date, courseId } = action.payload;
      state.date = new Date(date).toISOString();
      state.courseId = courseId;
    },
    reset: () => initialState,
  },
});

export const { setDate, setCourseId, resetUpdate, reset } =
  completedCourseSlice.actions;
export default completedCourseSlice.reducer;
