import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "../Auth/RequireAuth";
import PersistentLogin from "../Auth/PersistentLogin";
import Prefetch from "../Auth/Prefetch";
import Layout from "../Layout/Layout/Layout";
import Applications from "../Pages/Applications";
import CompletedCourses from "../Pages/CompletedCourses";
import CourseSettings from "../Pages/CourseSettings/CourseSettings";
import CustomApplication from "../Pages/CustomApplication/CustomApplication";
import DashboardPage from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/MyProfile/MyProfile";
import OrganizationSettings from "../Pages/OrganizationSettings/OrganizationSettings";
import Organizations from "../Pages/Organizations/Organizations";
import Payments from "../Pages/Payments";
import SingleCourse from "../Pages/SingleCourse/SingleCourse";
import SingleOrganization from "../Pages/SingleOrganization/SingleOrganization";
import CourseSummary from "../Components/Summary/CourseSummary";
import SessionList from "../CardList/Sessions/SessionList";
import TopicList from "../Lists/Topics/TopicList";
import Application from "../Forms/Application";
import { ROLES } from "../Config/roles";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Prefetch />}>
          <Route element={<PersistentLogin />}>
            <Route index element={<DashboardPage />} />
            <Route path="custom-application" element={<CustomApplication />} />
            <Route path="applications" element={<Applications />} />
            <Route path="payments" element={<Payments />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="new-organization" element={<OrganizationSettings />} />
            <Route path="completed-courses" element={<CompletedCourses />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="course">
              <Route index element={<CourseSettings />} />
              <Route path=":courseId" element={<SingleCourse />}>
                <Route index element={<CourseSummary />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="settings" element={<CourseSettings />} />
                </Route>
                <Route path="topics" element={<TopicList />} />
                <Route path="sessions">
                  <Route index element={<SessionList />} />
                  <Route path=":sessionId" element={<Application />} />
                </Route>
                <Route path="applications" element={<Applications />} />
              </Route>
            </Route>
            <Route path=":organizationId" element={<SingleOrganization />}>
              <Route path="applications" element={<Applications />} />
              <Route path="members" element={<Payments />} />
              <Route path="payments" element={<Payments />} />
              <Route path="settings" element={<OrganizationSettings />} />
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
