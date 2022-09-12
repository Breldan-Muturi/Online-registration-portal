import React from "react";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "./styles";
import MenuProps from "../../../Helpers/MenuProps";
import { useDispatch, useSelector } from "react-redux";
import { useGetCoursesQuery } from "../../../Features/api/courseApiSlice";
import { useParams } from "react-router-dom";
import Prerequisite from "../Chips/Prerequisite";
import { allPrerequisites } from "../../../Features/forms/courseSettingsSlice";
import PrerequisiteMenu from "../MenuItems/PrerequisiteMenu";

const Prerequisites = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const prerequisites = useSelector(
    (state) => state.courseSettings.prerequisites
  );

  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery("courses", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={2} alignItems="center">
        <CircularProgress size={20} />
        <Typography variant="body1">
          Loading prerequisite courses ...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography
        variant="body1"
        color="error"
      >{`Something went wrong loading prerequisite courses: ${error?.data?.message}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids } = courses;
    const prerequisiteIds = courseId
      ? ids.filter((prerequisiteId) => prerequisiteId !== courseId)
      : [...ids];
    if (!prerequisiteIds.length) {
      content = (
        <Typography variant="body1" color="error">
          There are no available prerequisite courses.
        </Typography>
      );
    }
    if (prerequisiteIds.length) {
      const isAllSelected = [
        prerequisiteIds.length > 0,
        prerequisiteIds.length === prerequisites.length,
      ].every(Boolean);
      const prerequisitesSelected = [
        prerequisites.length > 0,
        prerequisites.length < prerequisiteIds.length,
      ].every(Boolean);
      const labelId = `checkbox-list-secondary-label-${
        isAllSelected ? "Des" : "s"
      }elect-all-prerequisites`;
      content = (
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="prerequisite-courses">
            Select Prerequisite Courses
          </InputLabel>
          <Select
            labelId="select-prerequisite-courses"
            label="Select prerequisite courses"
            multiple
            value={prerequisites}
            renderValue={(prerequisites) => (
              <div className={classes.chips}>
                {prerequisites.map((prerequisiteId) => (
                  <Prerequisite
                    key={prerequisiteId}
                    prerequisiteId={prerequisiteId}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            <ListItemButton
              divider
              dense
              selected={isAllSelected}
              onClick={() => dispatch(allPrerequisites(prerequisiteIds))}
            >
              <Checkbox
                color="primary"
                size="small"
                edge="start"
                inputProps={{ "aria-labelledby": labelId }}
                checked={isAllSelected}
                indeterminate={prerequisitesSelected}
              />
              <ListItemText
                id={labelId}
                primary={`${
                  prerequisites.length ? "Des" : "S"
                }elect all prerequisite courses`}
              />
            </ListItemButton>
            {prerequisiteIds.map((prerequisiteId, index) => (
              <PrerequisiteMenu key={index} prerequisiteId={prerequisiteId} />
            ))}
          </Select>
        </FormControl>
      );
    }
  }

  return content;
};

export default Prerequisites;
