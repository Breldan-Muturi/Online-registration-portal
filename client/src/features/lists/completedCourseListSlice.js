import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCompletions: [],
  expandedCompletion: "",
  modalNewCompletion: false,
  modalDeleteCompletion: "",
  modalSelectedCompletions: false,
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
    selectAllCompletions: (state, action) => {
      state.selectedCompletions = state.selectedCompletions.length
        ? []
        : action.payload;
    },
    expandCompletion: (state, action) => {
      state.expandedCompletion =
        state.expandedCompletion === action.payload ? "" : action.payload;
    },
    newCompletionModal: (state) => {
      state.modalNewCompletion = !state.modalNewCompletion;
    },
    deleteCompletionModal: (state, action) => {
      state.modalDeleteCompletion =
        state.modalDeleteCompletion === action.payload ? "" : action.payload;
    },
    toggleSelectedCompletionsModal: (state) => {
      state.modalSelectedCompletions = !state.modalSelectedCompletions;
    },
  },
});

export const {
  toggleCompletion,
  expandCompletion,
  newCompletionModal,
  deleteCompletionModal,
  selectAllCompletions,
  toggleSelectedCompletionsModal,
} = completedCourseListSlice.actions;

export default completedCourseListSlice.reducer;
