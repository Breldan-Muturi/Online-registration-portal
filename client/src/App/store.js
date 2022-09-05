import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../Features/api/apiSlice";
import authReducer from "../Features/global/authSlice";
import authFormReducer from "../Features/forms/authFormSlice";
import customApplicationReducer from "../Features/forms/customApplicationSlice";
import sideReducer from "../Features/global/sideSlice";
import organizationReducer from "../Features/forms/organizationSlice";
import sessionReducer from "../Features/forms/sessionSlice";
import topicReducer from "../Features/forms/topicSlice";
import applicationTableReducer from "../Features/lists/applicationTableSlice";
import paymentFormReducer from "../Features/forms/paymentFormSlice";
import paymentListReducer from "../Features/lists/paymentListSlice";
import completedCourseListReducer from "../Features/lists/completedCourseListSlice";
import participantListReducer from "../Features/lists/participantListSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    authForm: authFormReducer,
    customApplication: customApplicationReducer,
    applicationTable: applicationTableReducer,
    paymentForm: paymentFormReducer,
    paymentList: paymentListReducer,
    side: sideReducer,
    session: sessionReducer,
    organization: organizationReducer,
    topic: topicReducer,
    completedCourseList: completedCourseListReducer,
    participantList: participantListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
