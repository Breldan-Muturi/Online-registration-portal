import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedApplication: "",
  selectedPayments: [],
  expandedPayment: "",
};

export const paymentListSlice = createSlice({
  name: "paymentList",
  initialState,
  reducers: {
    selectApplication: (state, action) => {
      state.selectedApplication = action.payload;
    },
    togglePayment: (state, action) => {
      state.selectedPayments = state.selectedPayments.includes(action.payload)
        ? state.selectedPayments.filter(
            (filteredPayment) => filteredPayment !== action.payload
          )
        : state.selectedPayments.concat(action.payload);
    },
    expandPayment: (state, action) => {
      state.expandedPayment = action.payload;
    },
  },
});

export const { selectApplication, togglePayment, expandPayment } =
  paymentListSlice.actions;

export default paymentListSlice.reducer;
