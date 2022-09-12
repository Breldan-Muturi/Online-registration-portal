import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseTab: "Summary",
  sessionId: null,
  organizationTab: "Applications",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setCourseTab: (state, action) => {
      state.sessionId = null;
      state.courseTab = action.payload;
    },
    setOrganizationTab: (state, action) => {
      state.organizationTab = action.payload;
    },
    setSessionApplication: (state, action) => {
      state.courseTab = "Sessions";
      state.sessionId = action.payload;
    },
  },
});

export const { setCourseTab, setOrganizationTab, setSessionApplication } =
  navSlice.actions;

export default navSlice.reducer;
