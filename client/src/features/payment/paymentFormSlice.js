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
    reset: () => initialState,
  },
});

export const { setPaymentMethod, setPaymentAmount, setPaymentCode, reset } =
  paymentFormSlice.actions;

export default paymentFormSlice.reducer;
