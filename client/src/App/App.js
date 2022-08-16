import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth, PersistentLogin } from "../containers";
import { Layout } from "../Layout";
import {
  Applications,
  CompletedCourses,
  CourseSettings,
  CustomApplication,
  DashboardPage,
  MyProfile,
  OrganizationSettings,
  Organizations,
  Payments,
  SingleCourse,
} from "../pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route element={<PersistentLogin />}>
          {/* Public Routes */}
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="custom-application" element={<CustomApplication />} />
            <Route path="applications" element={<Applications />} />
            <Route path="payments" element={<Payments />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="new-organization" element={<OrganizationSettings />} />
            <Route path="completed-courses" element={<CompletedCourses />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="course">
              <Route index element={<CourseSettings />} />
              <Route path=":courseId">
                <Route index element={<SingleCourse />} />
                {/* <Route path="summary" element={<SingleCourse />} />
            <Route path="settings" element={<SingleCourse />} />
            <Route path="topics" element={<SingleCourse />} />
            <Route path="sessions">
              <Route index element={<SingleCourse />} />
              <Route path=":sessionId" element={<SingleCourse />} />
            </Route>
            <Route path="applications" element={<SingleCourse />} /> */}
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
