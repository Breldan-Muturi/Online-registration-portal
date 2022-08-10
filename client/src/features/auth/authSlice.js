import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => initialState,
  },
});

export const {
  toggleModal,
  toggleAuthMode,
  togglePasswordVisible,
  toggleConfirmVisible,
  setCredentials,
  logOut,
} = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
