import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedApplication: "",
  selectedPayments: [],
  expandedPayment: "",
  modalApprovePayment: "",
  modalApproveSelectedPayments: false,
  modalRejectPayment: "",
  modalRejectSelectedPayments: false,
  modalDeletePayment: "",
  modalDeleteSelectedPayments: false,
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
    toggleModalApprovePayment: (state, action) => {
      state.modalApprovePayment = action.payload;
    },
    toggleModalApproveSelectedPayments: (state) => {
      state.modalApproveSelectedPayments = !state.modalApproveSelectedPayments;
    },
    toggleModalRejectPayment: (state, action) => {
      state.modalRejectPayment = action.payload;
    },
    toggleModalRejectSelectedPayments: (state) => {
      state.modalRejectSelectedPayments = !state.modalRejectSelectedPayments;
    },
    toggleModalDeletePayment: (state, action) => {
      state.modalDeletePayment = action.payload;
    },
    toggleModalDeleteSelectedPayments: (state) => {
      state.modalDeleteSelectedPayments = !state.modalDeleteSelectedPayments;
    },
  },
});

export const {
  selectApplication,
  selectEveryPayment,
  togglePayment,
  expandPayment,
  toggleModalApprovePayment,
  toggleModalApproveSelectedPayments,
  toggleModalRejectPayment,
  toggleModalRejectSelectedPayments,
  toggleModalDeletePayment,
  toggleModalDeleteSelectedPayments,
} = paymentListSlice.actions;

export default paymentListSlice.reducer;
