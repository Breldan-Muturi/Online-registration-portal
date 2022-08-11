import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sponsorType: "",
  courseId: "",
  isTopics: false,
  searchTopicsByCourse: [],
  searchTopicsByTitle: "",
  selectedTopicIds: [],
  startDate: "",
  endDate: "",
  deliveryType: "",
  venue: "",
  participants: [],
};

export const customApplicationSlice = createSlice({
  name: "customApplication",
  initialState,
  reducers: {
    setSponsorType: (state, action) => {
      state.sponsorType = action.payload;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    toggleIsTopics: (state) => {
      state.isTopics = !state.isTopics;
    },
    setTopicsCourse: (state, action) => {},
    removeTopicsCourse: (state, action) => {},
    clearTopicsCourse: (state, action) => {},
    setTopicsTitle: (state, action) => {
      state.searchTopicsByTitle = action.payload;
    },
    addSelectedTopicId: (state, action) => {
      state.selectedTopicIds = state.selectedTopicIds.concat(action.payload);
    },
    removeSelectedTopicId: (state, action) => {
      state.selectedTopicIds = state.selectedTopicIds.filter(
        (filteredTopicId) => filteredTopicId !== action.payload
      );
    },
    setSelectedTopicIds: (state, action) => {
      state.selectedTopicIds = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
    setVenue: (state, action) => {
      state.venue = action.payload;
    },
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    removeParticipants: (state, action) => {
      state.participants = state.participants.filter(
        (filteredParticipant) => filteredParticipant !== action.payload
      );
    },
    addAllParticipants: (state, action) => {},
    clearParticipants: (state, action) => {},
    reset: () => initialState,
  },
});

export const {
  setSponsorType,
  setCourseId,
  toggleIsTopics,
  setTopicsCourse,
  removeTopicsCourse,
  clearTopicsCourse,
  setTopicsTitle,
  addSelectedTopicId,
  removeSelectedTopicId,
  setSelectedTopicIds,
  setStartDate,
  setEndDate,
  setDeliveryType,
  setVenue,
  setParticipants,
  removeParticipants,
  addAllParticipants,
  clearParticipants,
  reset,
} = customApplicationSlice.actions;

export default customApplicationSlice.reducer;
