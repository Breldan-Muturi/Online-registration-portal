import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  roles: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, firstName, lastName, email, avatar, roles } = action.payload;
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.avatar = avatar;
      state.roles = roles;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
