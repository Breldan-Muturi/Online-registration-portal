import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authMode: "login",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  passwordVisible: false,
  confirmVisible: false,
};

export const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    toggleAuthMode: (state) => {
      state.authMode === "login"
        ? (state.authMode = "register")
        : (state.authMode = "login");
    },
    togglePasswordVisible: (state) => {
      state.passwordVisible = !state.passwordVisible;
    },
    toggleConfirmVisible: (state) => {
      state.confirmVisible = !state.confirmVisible;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  toggleAuthMode,
  togglePasswordVisible,
  toggleConfirmVisible,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  reset,
} = authFormSlice.actions;
export default authFormSlice.reducer;
