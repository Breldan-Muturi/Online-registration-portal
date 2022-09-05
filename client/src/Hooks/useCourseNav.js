import { useLocation, useParams } from "react-router-dom";

const useCourseNav = () => {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const routes = [
    `/course/${courseId}`,
    `/course/${courseId}/settings`,
    `/course/${courseId}/topics`,
    `/course/${courseId}/sessions`,
    `/course/${courseId}/applications`,
  ];

  return { routes, courseId, pathname };
};

export default useCourseNav;
