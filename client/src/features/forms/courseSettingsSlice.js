import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  code: "",
  prerequisites: [],
  description: "",
};

export const courseSettingsSlice = createSlice({
  name: "courseSettings",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    allPrerequisites: (state, action) => {
      state.prerequisites = state.prerequisites.length
        ? []
        : state.prerequisites.concat(action.payload);
    },
    singlePrerequisite: (state, action) => {
      state.prerequisites = state.prerequisites.includes(action.payload)
        ? state.prerequisites.filter(
            (prerequisite) => prerequisite !== action.payload
          )
        : state.prerequisites.concat(action.payload);
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    resetUpdate: (state, action) => {
      const { title, code, description, prerequisites } = action.payload;
      state.title = title;
      state.code = code;
      state.description = description;
      state.prerequisites = prerequisites;
    },
    resetCreate: () => initialState,
  },
});

export const {
  setTitle,
  setCode,
  allPrerequisites,
  singlePrerequisite,
  setDescription,
  resetUpdate,
  resetCreate,
} = courseSettingsSlice.actions;

export default courseSettingsSlice.reducer;
