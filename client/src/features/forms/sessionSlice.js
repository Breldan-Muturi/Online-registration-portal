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
  reset,
} = sessionSlice.actions;
export default sessionSlice.reducer;
