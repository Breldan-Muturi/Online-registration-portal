import React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCourseById } from "../../Features/api/courseApiSlice";

const CourseSummary = () => {
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));
  return <Typography>{course.description}</Typography>;
};

export default CourseSummary;
