import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCompletions: [],
  expandedCompletion: "",
  modalCompletion: "",
  modalAllCompletions: false,
};

export const completedCourseListSlice = createSlice({
  name: "completedCourseList",
  initialState,
  reducers: {
    toggleCompletion: (state, action) => {
      state.selectedCompletions = state.selectedCompletions.includes(
        action.payload
      )
        ? state.selectedCompletions.filter(
            (filteredCompletion) => filteredCompletion !== action.payload
          )
        : state.selectedCompletions.concat(action.payload);
    },
    expandCompletion: (state, action) => {
      state.expandedCompletion = action.payload;
    },
    openCompletionModal: (state, action) => {
      state.modalCompletion = action.payload;
    },
    selectAllCompletions: (state, action) => {
      state.selectedCompletions = action.payload;
    },
    toggleAllCompletionsModal: (state) => {
      state.modalAllCompletions = !state.modalAllCompletions;
    },
  },
});

export const {
  toggleCompletion,
  expandCompletion,
  openCompletionModal,
  selectAllCompletions,
  toggleAllCompletionsModal,
} = completedCourseListSlice.actions;

export default completedCourseListSlice.reducer;
