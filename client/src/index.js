import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App/App";
import { store } from "./App/store";
import { theme } from "./App/theme";
import { courseApiSlice } from "./features/course/courseApiSlice";
import { organizationApiSlice } from "./features/organization/organizationApiSlice";
import { sessionApiSlice } from "./features/session/sessionApiSlice";
import { topicApiSlice } from "./features/topic/topicApiSlice";
import { usersApiSlice } from "./features/user/usersApiSlice";

store.dispatch(courseApiSlice.endpoints.getCourses.initiate());
store.dispatch(sessionApiSlice.endpoints.getSessions.initiate());
store.dispatch(organizationApiSlice.endpoints.getOrganizations.initiate());
store.dispatch(topicApiSlice.endpoints.getTopics.initiate());
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
