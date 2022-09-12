import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalDelete: "",
  modalEdit: "",
};

export const sessionListSlice = createSlice({
  name: "sessionList",
  initialState,
  reducers: {
    toggleDelete: (state, action) => {
      state.modalDelete =
        state.modalDelete === action.payload ? "" : action.payload;
    },
    toggleEdit: (state, action) => {
      state.modalEdit =
        state.modalEdit === action.payload ? "" : action.payload;
    },
  },
});

export const { toggleDelete, toggleEdit } = sessionListSlice.actions;

export default sessionListSlice.reducer;
