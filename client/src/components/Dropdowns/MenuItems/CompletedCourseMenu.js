import React from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import { useSelector } from "react-redux";

const CompletedCourseMenu = ({ courseId }) => {
  const { courseId: selectedCourseId } = useSelector((state) => state.completedCourse);
  const { title } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      title: data?.entities[courseId].title,
    }),
  });
  const labelId = `checkbox-list-secondary-label-${
    selectedCourseId === courseId ? "Des" : "s"
  }elect-${title}`;
  return (
    <ListItemButton divider dense selected={selectedCourseId === courseId}>
      <Checkbox
        color="primary"
        size="small"
        edge="start"
        inputProps={{ "aria-labelledby": labelId }}
        checked={selectedCourseId === courseId}
      />
      <ListItemText id={labelId} primary={title} />
    </ListItemButton>
  );
};

export default CompletedCourseMenu;
