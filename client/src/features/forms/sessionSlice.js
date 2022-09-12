import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
  venue: "",
  onPremisesFee: "",
  onPremisesSlots: "",
  onlineFee: "",
  onlineSlots: "",
  isOpen: false,
  sessions: [],
  status: "idle", // 'idle' | 'loading' | 'success' | 'failed'
  courseId: null,
  message: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setVenue: (state, action) => {
      state.venue = action.payload;
    },
    setOnPremisesFee: (state, action) => {
      state.onPremisesFee = action.payload;
    },
    setOnPremiesSlots: (state, action) => {
      state.onPremisesSlots = action.payload;
    },
    setOnlineFee: (state, action) => {
      state.onlineFee = action.payload;
    },
    setOnlineSlots: (state, action) => {
      state.onlineSlots = action.payload;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    resetUpdate: (state, action) => {
      const {
        endDate,
        startDate,
        courseId,
        onPremisesFee,
        onPremisesSlots,
        venue,
        onlineFee,
        onlineSlots,
      } = action.payload;
      state.startDate = new Date(startDate).toISOString();
      state.endDate = new Date(endDate).toISOString();
      state.courseId = courseId;
      state.onPremisesFee = onPremisesFee;
      state.onPremisesSlots = onPremisesSlots;
      state.venue = venue;
      state.onlineFee = onlineFee;
      state.onlineSlots = onlineSlots;
    },
    reset: () => initialState,
  },
});

export const {
  setStartDate,
  setEndDate,
  setVenue,
  setOnPremisesFee,
  setOnPremiesSlots,
  setOnlineFee,
  setOnlineSlots,
  toggleModal,
  setCourseId,
  resetUpdate,
  reset,
} = sessionSlice.actions;
export default sessionSlice.reducer;
