import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organizationService from "./organizationService";

const initialState = {
  organizations: [],
  status: "idle", // 'idle' | 'loading' | 'success' | 'failed'
  message: null,
};

//Create an Organization
export const createOrganization = createAsyncThunk(
  "api/organizations",
  async (organizationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await organizationService.createOrganization(
        organizationData,
        token
      );
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Organizations
export const getOrganizations = createAsyncThunk(
  "api/organizations/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await organizationService.getOrganizations(token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete Organization
export const deleteOrganization = createAsyncThunk(
  "api/organizations/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await organizationService.deleteOrganization(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.status = "success";
        state.organizations.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getOrganizations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.status = "success";
        state.organizations = action.payload;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(deleteOrganization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.status = "success";
        state.organizations = state.organizations.filter(
          (organization) => organization._id !== action.payload.id
        );
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const selectAllOrganizations = (state) =>
  state.organization.organizations;
export const getOrganizationsStatus = (state) => state.organization.status;
export const getOrganizationsError = (state) => state.organization.message;

export const { reset } = organizationSlice.actions;
export default organizationSlice.reducer;
