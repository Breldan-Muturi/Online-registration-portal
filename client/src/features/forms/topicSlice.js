import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  isOpen: false,
};

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    reset: (state) => initialState,
  },
});

export const { toggleModal, setTitle, setDescription, reset } =
  topicSlice.actions;
export default topicSlice.reducer;
