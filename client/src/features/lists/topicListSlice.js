import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expanded: "",
  modalDelete: "",
  modalEdit: "",
  selected: [],
  modalDeleteSelected: false,
};

export const topicListSlice = createSlice({
  name: "topicList",
  initialState,
  reducers: {
    toggleExpanded: (state, action) => {
      state.expanded = state.expanded === action.payload ? "" : action.payload;
    },
    toggleDelete: (state, action) => {
      state.modalDelete =
        state.modalDelete === action.payload ? "" : action.payload;
    },
    toggleEdit: (state, action) => {
      state.modalEdit =
        state.modalEdit === action.payload ? "" : action.payload;
    },
    toggleSelected: (state, action) => {
      state.selected = state.selected.includes(action.payload)
        ? state.selected.filter((topicId) => topicId !== action.payload)
        : state.selected.concat(action.payload);
    },
    toggleListSelected: (state, action) => {
      state.selected = state.selected.length
        ? []
        : state.selected.concat(action.payload);
    },
    toggleDeleteSelected: (state) => {
      state.modalDeleteSelected = !state.modalDeleteSelected;
    },
  },
});

export const {
  toggleExpanded,
  toggleDelete,
  toggleEdit,
  toggleSelected,
  toggleListSelected,
  toggleDeleteSelected,
} = topicListSlice.actions;

export default topicListSlice.reducer;
