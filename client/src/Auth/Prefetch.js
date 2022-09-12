import { store } from "../App/store";
import { topicApiSlice } from "../Features/api/topicApiSlice";
import { sessionApiSlice } from "../Features/api/sessionApiSlice";
import { courseApiSlice } from "../Features/api/courseApiSlice";
import { applicationApiSlice } from "../Features/api/applicationApiSlice";
import { usersApiSlice } from "../Features/api/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { paymentsApiSlice } from "../Features/api/paymentApiSlice";
import { completedCoursesApiSlice } from "../Features/api/completedCoursesApiSlice";
import { organizationApiSlice } from "../Features/api/organizationApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      courseApiSlice.util.prefetch("getCourses", "courses", { force: true })
    );
    store.dispatch(
      sessionApiSlice.util.prefetch("getSessions", "sessions", { force: true })
    );
    store.dispatch(
      topicApiSlice.util.prefetch("getTopics", "topics", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "users", { force: true })
    );
    store.dispatch(
      organizationApiSlice.util.prefetch("getOrganizations", "organizations", {
        force: true,
      })
    );
    store.dispatch(
      applicationApiSlice.util.prefetch("getApplications", "applications", {
        force: true,
      })
    );
    store.dispatch(
      paymentsApiSlice.util.prefetch("getPayments", "payments", { force: true })
    );
    store.dispatch(
      completedCoursesApiSlice.util.prefetch(
        "getCompletedCourses",
        "completedCourses",
        { force: true }
      )
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;
