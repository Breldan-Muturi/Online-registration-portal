import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedApplication: "",
  selectedPayments: [],
  expandedPayment: "",
  modalPayment: "",
  modalSelectedPayments: false,
};

export const paymentListSlice = createSlice({
  name: "paymentList",
  initialState,
  reducers: {
    selectApplication: (state, action) => {
      state.selectedApplication = action.payload;
    },
    selectEveryPayment: (state, action) => {
      state.selectedPayments = action.payload;
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
    toggleModalPayment: (state, action) => {
      state.modalPayment = action.payload;
    },
    toggleModalSelectedPayments: (state) => {
      state.modalSelectedPayments = !state.modalSelectedPayments;
    },
  },
});

export const {
  selectApplication,
  selectEveryPayment,
  togglePayment,
  expandPayment,
  toggleModalPayment,
  toggleModalSelectedPayments,
} = paymentListSlice.actions;

export default paymentListSlice.reducer;
