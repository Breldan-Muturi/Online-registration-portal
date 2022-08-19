import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "",
  dense: false,
  page: 0,
  rowsPerPage: 5,
};

export const applicationTableSlice = createSlice({
  name: "applicationTable",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    toggleDense: (state) => {
      state.dense = !state.dense;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const { setSelected, toggleDense, setPage, setRowsPerPage } =
  applicationTableSlice.actions;

export default applicationTableSlice.reducer;
