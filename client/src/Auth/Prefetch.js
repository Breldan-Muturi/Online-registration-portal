import { store } from "../App/store";
import { topicApiSlice } from "../Features/api/topicApiSlice";
import { sessionApiSlice } from "../Features/api/sessionApiSlice";
import { courseApiSlice } from "../Features/api/courseApiSlice";
import { applicationApiSlice } from "../Features/api/applicationApiSlice";
import { usersApiSlice } from "../Features/api/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Features/global/authSlice";
import { paymentsApiSlice } from "../Features/api/paymentApiSlice";
import { completedCoursesApiSlice } from "../Features/api/completedCoursesApiSlice";

const Prefetch = () => {
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    const courses = store.dispatch(
      courseApiSlice.endpoints.getCourses.initiate()
    );
    const sessions = store.dispatch(
      sessionApiSlice.endpoints.getSessions.initiate()
    );
    const topics =
      token && store.dispatch(topicApiSlice.endpoints.getTopics.initiate());
    const users =
      token && store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const applications =
      token &&
      store.dispatch(applicationApiSlice.endpoints.getApplications.initiate());
    const payments =
      token &&
      store.dispatch(paymentsApiSlice.endpoints.getPayments.initiate());
    const completedCourses =
      token &&
      store.dispatch(
        completedCoursesApiSlice.endpoints.getCompletedCourses.initiate()
      );

    return () => {
      courses.unsubscribe();
      sessions.unsubscribe();
      if (token) {
        topics.unsubscribe();
        users.unsubscribe();
        applications.unsubscribe();
        payments.unsubscribe();
        completedCourses.unsubscribe();
      }
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
