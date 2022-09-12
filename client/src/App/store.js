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
import paymentTableReducer from "../Features/lists/paymentTableSlice";
import courseSettingsReducer from "../Features/forms/courseSettingsSlice";
import navReducer from "../Features/global/navSlice";
import topicListReducer from "../Features/lists/topicListSlice";
import sessionListReducer from "../Features/lists/sessionListSlice";
import completedCourseReducer from "../Features/forms/completedCourseSlice";

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
    paymentTable: paymentTableReducer,
    courseSettings: courseSettingsReducer,
    nav: navReducer,
    topicList: topicListReducer,
    sessionList: sessionListReducer,
    completedCourse: completedCourseListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
