import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: "",
  paymentAmount: null,
  paymentCode: "",
  paymentAttachments: [],
};

export const paymentFormSlice = createSlice({
  name: "paymentForm",
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setPaymentAmount: (state, action) => {
      state.paymentAmount = action.payload;
    },
    setPaymentCode: (state, action) => {
      state.paymentCode = action.payload;
    },
    addPaymentAttachment: (state, action) => {
      state.paymentAttachments = state.paymentAttachments.concat(
        action.payload
      );
    },
    removePaymentAttachment: (state, action) => {
      const { url } = action.payload;
      state.paymentAttachments = state.paymentAttachments.filter(
        (filteredAttachment) => filteredAttachment.url !== url
      );
    },
    reset: () => initialState,
  },
});

export const {
  setPaymentMethod,
  setPaymentAmount,
  setPaymentCode,
  addPaymentAttachment,
  removePaymentAttachment,
  reset,
} = paymentFormSlice.actions;

export default paymentFormSlice.reducer;
