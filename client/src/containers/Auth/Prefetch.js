import { store } from "../../App/store";
import { topicApiSlice } from "../../features/topic/topicApiSlice";
import { sessionApiSlice } from "../../features/session/sessionApiSlice";
import { courseApiSlice } from "../../features/course/courseApiSlice";
import { applicationApiSlice } from "../../features/application/applicationApiSlice";
import { usersApiSlice } from "../../features/user/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { paymentsApiSlice } from "../../features/payment/paymentApiSlice";
import { completedCoursesApiSlice } from "../../features/completedCourse/completedCoursesApiSlice";

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
