import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App/App";
import { store } from "./App/store";
import { theme } from "./App/theme";
import { courseApiSlice } from "./features/course/courseApiSlice";
import { getSessions } from "./features/session/sessionSlice";

store.dispatch(courseApiSlice.endpoints.getCourses.initiate());
store.dispatch(getSessions());

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
