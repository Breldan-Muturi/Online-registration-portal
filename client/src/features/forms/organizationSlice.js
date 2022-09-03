import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
  county: "",
  organizationLogo: "",
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setCounty: (state, action) => {
      state.county = action.payload;
    },
    setOrganizationLogo: (state, action) => {
      state.organizationLogo = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setName,
  setEmail,
  setAddress,
  setPhoneNumber,
  setCounty,
  setOrganizationLogo,
  reset,
} = organizationSlice.actions;
export default organizationSlice.reducer;
