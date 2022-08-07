import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./sessionService";

const initialState = {
  startDate: "",
  endDate: "",
  venue: "",
  onPremisesFee: "",
  onPremisesSlots: "",
  onlineFee: "",
  onlineSlots: "",
  isOpen: false,
  sessions: [],
  status: "idle", // 'idle' | 'loading' | 'success' | 'failed'
  message: null,
};

//Create a Session
export const createSession = createAsyncThunk(
  "api/sessions",
  async (sessionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.createSession(sessionData, token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Sessions
export const getSessions = createAsyncThunk(
  "api/sessions/getAll",
  async (_, thunkAPI) => {
    try {
      return await sessionService.getSessions();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete Session
export const deleteSession = createAsyncThunk(
  "api/sessions/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.deleteSession(id, token);
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

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setVenue: (state, action) => {
      state.venue = action.payload;
    },
    setOnPremisesFee: (state, action) => {
      state.onPremisesFee = action.payload;
    },
    setOnPremiesSlots: (state, action) => {
      state.onPremisesSlots = action.payload;
    },
    setOnlineFee: (state, action) => {
      state.onlineFee = action.payload;
    },
    setOnlineSlots: (state, action) => {
      state.onlineSlots = action.payload;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.status = "success";
        state.sessions.push(action.payload);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getSessions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.status = "success";
        state.sessions = action.payload;
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(deleteSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.status = "success";
        state.sessions = state.sessions.filter(
          (session) => session._id !== action.payload.id
        );
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const selectAllSessions = (state) => state.session.sessions;
export const getSessionsStatus = (state) => state.session.status;
export const getSessionsError = (state) => state.session.message;

export const {
  setStartDate,
  setEndDate,
  setVenue,
  setOnPremisesFee,
  setOnPremiesSlots,
  setOnlineFee,
  setOnlineSlots,
  toggleModal,
  reset,
} = sessionSlice.actions;
export default sessionSlice.reducer;
