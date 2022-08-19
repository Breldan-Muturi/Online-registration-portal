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

const Prefetch = () => {
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    console.log("subscribing");
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

    return () => {
      console.log("unsubscribing");
      courses.unsubscribe();
      sessions.unsubscribe();
      topics.unsubscribe();
      users.unsubscribe();
      applications.unsubscribe();
    };
  }, [token]);

  return <Outlet />;
};

export default Prefetch;
