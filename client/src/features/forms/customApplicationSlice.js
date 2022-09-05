import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sponsorType: "",
  sponsorOrganization: null,
  sponsorName: "",
  sponsorEmail: "",
  sponsorPhoneNumber: "",
  sponsorAddress: "",
  sponsorCounty: "",
  sponsorContactPerson: "",
  sponsorContactEmail: "",
  sponsorLogo: "",
  courseId: "",
  isTopics: false,
  searchTopicsByCourse: [],
  searchTopicsByTitle: "",
  selectedTopicIds: [],
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  deliveryType: "",
  venue: "",
  participants: [],
  isOnlyParticipant: false,
  isNewOrganization: false,
  isOpenReview: false,
  activeStep: 0,
};

export const customApplicationSlice = createSlice({
  name: "customApplication",
  initialState,
  reducers: {
    setSponsorType: (state, action) => {
      state.sponsorType = action.payload;
    },
    setSponsorOrganization: (state, action) => {
      state.sponsorOrganization = action.payload;
    },
    setSponsorName: (state, action) => {
      state.sponsorName = action.payload;
    },
    setSponsorEmail: (state, action) => {
      state.sponsorEmail = action.payload;
    },
    setSponsorPhoneNumber: (state, action) => {
      state.sponsorPhoneNumber = action.payload;
    },
    setSponsorAddress: (state, action) => {
      state.sponsorAddress = action.payload;
    },
    setSponsorCounty: (state, action) => {
      state.sponsorCounty = action.payload;
    },
    setSponsorContactPerson: (state, action) => {
      state.sponsorContactPerson = action.payload;
    },
    setSponsorContactEmail: (state, action) => {
      state.sponsorContactEmail = action.payload;
    },
    setSponsorLogo: (state, action) => {
      state.sponsorLogo = action.payload;
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
      console.log(action.payload);
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      console.log(action.payload);
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
    addSingleParticipant: (state, action) => {
      const participants = [];
      state.participants = participants.concat(action.payload);
    },
    removeParticipants: (state, action) => {
      state.participants = state.participants.filter(
        (filteredParticipant) => filteredParticipant !== action.payload
      );
    },
    toggleIsOnlyParticipant: (state) => {
      state.isOnlyParticipant = !state.isOnlyParticipant;
    },
    toggleIsNewOrganization: (state) => {
      state.isNewOrganization = !state.isNewOrganization;
    },
    toggleIsOpenReview: (state) => {
      state.isOpenReview = !state.isOpenReview;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setSponsorType,
  setSponsorOrganization,
  setSponsorName,
  setSponsorEmail,
  setSponsorPhoneNumber,
  setSponsorAddress,
  setSponsorCounty,
  setSponsorContactPerson,
  setSponsorContactEmail,
  setSponsorLogo,
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
  addSingleParticipant,
  removeParticipants,
  toggleIsOnlyParticipant,
  toggleIsNewOrganization,
  toggleIsOpenReview,
  setActiveStep,
  reset,
} = customApplicationSlice.actions;

export default customApplicationSlice.reducer;