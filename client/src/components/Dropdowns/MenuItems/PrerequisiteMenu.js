import React from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import { singlePrerequisite } from "../../../Features/forms/courseSettingsSlice";
import { useDispatch, useSelector } from "react-redux";

const PrerequisiteMenu = ({ prerequisiteId }) => {
  const dispatch = useDispatch();
  const { prerequisites } = useSelector((state) => state.courseSettings);
  const { title } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      title: data?.entities[prerequisiteId].title,
    }),
  });
  const labelId = `checkbox-list-secondary-label-${
    prerequisites.includes(prerequisiteId) ? "Des" : "s"
  }elect-${title}`;
  return (
    <ListItemButton
      divider
      dense
      selected={prerequisites.includes(prerequisiteId)}
      onClick={() => dispatch(singlePrerequisite(prerequisiteId))}
    >
      <Checkbox
        color="primary"
        size="small"
        edge="start"
        inputProps={{ "aria-labelledby": labelId }}
        checked={prerequisites.includes(prerequisiteId)}
      />
      <ListItemText id={labelId} primary={title} />
    </ListItemButton>
  );
};

export default PrerequisiteMenu;
