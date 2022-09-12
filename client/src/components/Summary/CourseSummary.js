import React from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../Features/api/courseApiSlice";

const CourseSummary = () => {
  const { courseId } = useParams();
  const { description } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      description: data?.entities[courseId].description,
    }),
  });
  return <Typography>{description}</Typography>;
};

export default CourseSummary;
