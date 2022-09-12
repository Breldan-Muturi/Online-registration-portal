import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PersistentLogin from "../Auth/PersistentLogin";
import Prefetch from "../Auth/Prefetch";
import Layout from "../Layout/Layout/Layout";
import Applications from "../Pages/Applications";
import CompletedCourses from "../Pages/CompletedCourses";
import NewCourse from "../Pages/CourseSettings/NewCourse";
import CustomApplication from "../Pages/CustomApplication/CustomApplication";
import DashboardPage from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/MyProfile/MyProfile";
import OrganizationSettings from "../Pages/OrganizationSettings/OrganizationSettings";
import Organizations from "../Pages/Organizations/Organizations";
import Payments from "../Pages/Payments";
import SingleCourse from "../Pages/SingleCourse/SingleCourse";
import SingleOrganization from "../Pages/SingleOrganization/SingleOrganization";

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
              <Route index element={<NewCourse />} />
              <Route path=":courseId" element={<SingleCourse />} />
            </Route>
            <Route path=":organizationId" element={<SingleOrganization />} />
          </Route>
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
