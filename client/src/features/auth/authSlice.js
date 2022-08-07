import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isOpen: false,
  authMode: "login",
  passwordVisible: false,
  confirmVisible: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
    resetForm: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
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
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => initialState,
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  resetForm,
  toggleModal,
  toggleAuthMode,
  togglePasswordVisible,
  toggleConfirmVisible,
  setCredentials,
  logOut,
} = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
