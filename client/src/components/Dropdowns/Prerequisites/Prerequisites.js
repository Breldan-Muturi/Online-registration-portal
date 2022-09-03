import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import useStyles from "./styles";
import MenuProps from "../../../Helpers/MenuProps";
import { useSelector } from "react-redux";
import { selectOtherCourses } from "../../../Features/api/courseApiSlice";
import { useParams } from "react-router-dom";

const Prerequisites = ({ prerequisites, setPrerequisites }) => {
  const { courseId } = useParams();
  const classes = useStyles();
  //Get courses other than the current page course
  const otherCourses = useSelector((state) =>
    selectOtherCourses(state, courseId)
  );

  //Check the prerequisites length is equal to the length of other courses
  const isAllSelected =
    otherCourses.length > 0 && prerequisites.length === otherCourses.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setPrerequisites(
        prerequisites.length === otherCourses.length
          ? []
          : otherCourses.map((mappedCourse) => mappedCourse._id)
      );
      return;
    }
    setPrerequisites(value);
  };

  const handleDelete = (mappedPrerequisite) => () => {
    // remove the prerequisite course from the list
    setPrerequisites(
      prerequisites.filter(
        (filteredPrerequisite) => filteredPrerequisite !== mappedPrerequisite
      )
    );
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="prerequisite-courses">
        Select Prerequisite Courses
      </InputLabel>
      <Select
        labelId="select-prerequisite-courses"
        label="Select prerequisite courses"
        multiple
        value={prerequisites}
        onChange={handleChange}
        renderValue={(prerequisites) => (
          <div className={classes.chips}>
            {otherCourses
              .filter((filteredCourse) =>
                prerequisites.includes(filteredCourse._id)
              )
              .map((mappedCourse) => (
                <Chip
                  key={mappedCourse._id}
                  label={mappedCourse.title}
                  clickable
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                  color="primary"
                  className={classes.chip}
                  onDelete={handleDelete(mappedCourse._id)}
                />
              ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : "",
          }}
        >
          <ListItemIcon>
            <Checkbox
              color="primary"
              classes={{ indeterminate: classes.indeterminateColor }}
              // Check that the selected courses equal the list of courses minus current course.
              checked={isAllSelected}
              indeterminate={
                prerequisites.length > 0 &&
                prerequisites.length < otherCourses.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {otherCourses.map((mappedCourse) => (
          // Map over the list of course labels
          <MenuItem key={mappedCourse._id} value={mappedCourse._id}>
            <ListItemIcon>
              <Checkbox
                color="primary"
                // Find this item in the prerequisite course list
                checked={prerequisites.includes(mappedCourse._id)}
              />
            </ListItemIcon>
            <ListItemText primary={mappedCourse.title} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Prerequisites;
