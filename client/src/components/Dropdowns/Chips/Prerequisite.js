import React from "react";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import { singlePrerequisite } from "../../../Features/forms/courseSettingsSlice";

const Prerequisite = ({ prerequisiteId }) => {
  const dispatch = useDispatch();
  console.log(prerequisiteId);
  const { title } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      title: data?.entities[prerequisiteId].title,
    }),
  });

  return (
    <Chip
      size="small"
      label={title}
      deleteIcon={
        <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
      }
      color="primary"
      clickable
      onDelete={() => dispatch(singlePrerequisite(prerequisiteId))}
    />
  );
};

export default Prerequisite;
