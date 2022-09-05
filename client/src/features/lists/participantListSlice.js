import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedParticipants: [],
  expandedParticipant: "",
  modalParticipant: "",
  modalSelectedParticipants: false,
};

export const participantListSlice = createSlice({
  name: "participantList",
  initialState,
  reducers: {
    selectEveryParticipant: (state, action) => {
      state.selectedParticipants = action.payload;
    },
    toggleParticipant: (state, action) => {
      state.selectedParticipants = state.selectedParticipants.includes(
        action.payload
      )
        ? state.selectedParticipants.filter(
            (filteredParticipant) => filteredParticipant !== action.payload
          )
        : state.selectedParticipants.concat(action.payload);
    },
    expandParticipant: (state, action) => {
      state.expandedParticipant = action.payload;
    },
    toggleModalParticipant: (state, action) => {
      state.modalParticipant = action.payload;
    },
    toggleModalSelectedParticipants: (state) => {
      state.modalSelectedParticipants = !state.modalSelectedParticipants;
    },
  },
});

export const {
  selectEveryParticipant,
  toggleParticipant,
  expandParticipant,
  toggleModalParticipant,
  toggleModalSelectedParticipants,
} = participantListSlice.actions;

export default participantListSlice.reducer;
