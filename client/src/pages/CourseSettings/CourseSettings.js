import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  MenuItem,
  FormControl,
  ListItemIcon,
  Checkbox,
  ListItemText,
  InputLabel,
  Select,
  Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useState } from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  selectOtherCourses,
} from "../../features/course/courseApiSlice";
import { useNavigate } from "react-router-dom";
import { useStyles, MenuProps } from "./styles";
import FileBase from "react-file-base64";

const CourseSettings = ({ course }) => {
  const classes = useStyles();

  const [createCourse, { isLoading, isSuccess, isError, error }] =
    useCreateCourseMutation();

  const [
    updateCourse,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      isError: isFailedUpdate,
      error: updateError,
    },
  ] = useUpdateCourseMutation();

  const navigate = useNavigate();

  //Get courses other than the current page course
  const otherCourses = useSelector((state) =>
    selectOtherCourses(state, course?._id)
  );

  const [courseData, setCourseData] = useState({
    title: course?.title,
    code: course?.code,
    description: course?.description,
    prerequisites: course?.prerequisites || [],
    courseImage: course?.courseImage,
  });

  const onChange = (e) => {
    setCourseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { title, code, description, prerequisites, courseImage } = courseData;

  //Check the prerequisites length is equal to the length of other courses
  const isAllSelected =
    otherCourses.length > 0 && prerequisites.length === otherCourses.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setCourseData({
        ...courseData,
        prerequisites:
          prerequisites.length === otherCourses.length
            ? []
            : otherCourses.map((mappedCourse) => mappedCourse._id),
      });
      return;
    }
    setCourseData({ ...courseData, prerequisites: value });
  };

  const handleDelete = (mappedPrerequisite) => () => {
    // remove the prerequisite course from the list
    setCourseData({
      ...courseData,
      prerequisites: prerequisites.filter(
        (filteredPrerequisite) => filteredPrerequisite !== mappedPrerequisite
      ),
    });
  };

  const canSave =
    [title, code, description].every(Boolean) && (!isLoading || !isUpdating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title,
      code,
      description,
      prerequisites,
      courseImage,
    };
    if (canSave) {
      try {
        course
          ? await updateCourse({
              ...courseData,
              _id: course._id,
            })
          : await createCourse({ ...courseData, _id: v4() }).unwrap();
        setCourseData({
          title: "",
          code: "",
          description: "",
          prerequisites: [],
          courseImage: "",
        });
        navigate(`/`);
      } catch (err) {
        console.error("Failed to submit the post", err);
      }
    }
  };

  const deleteCourse = () => {};

  return (
    <Box className={classes.box} component="form" onSubmit={handleSubmit}>
      <Grid
        item
        container
        xs={12}
        direction="row"
        spacing={3}
        justifyContent="space-between"
      >
        <Grid item xs={12}>
          <Typography variant="h2">
            {course ? "Update this course" : "Create a New Course"}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="title"
            value={title}
            id="title"
            label="Course Title"
            variant="outlined"
            required
            helperText={"Ensure to add a unique course title."}
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="code"
            value={code}
            id="code"
            label="Course Code"
            variant="outlined"
            required
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            value={description}
            id="description"
            label="Course Description"
            variant="outlined"
            required
            multiline
            minRows={4}
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <FileBase
            name="courseImage"
            value={courseImage}
            id="courseImage"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setCourseData({ ...courseData, courseImage: base64 })
            }
            fullWidth
          />
        </Grid>
        {isLoading && (
          <Grid item container xs={12} direction="row" alignItems="center">
            {(!isSuccess || !isUpdated) && <CircularProgress />}
            <Typography color={isLoading ? "textPrimary" : "error"}>
              {isLoading && "Updating course"}
              {isUpdating && "Publishing new course"}
              {isError && `Something went wrong: ${error}`}
              {isFailedUpdate && `Something went wrong: ${updateError}`}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            disabled={!canSave}
            type="submit"
            variant="contained"
            size="large"
            className={classes.submit}
          >
            {course ? "Update this course" : "Create New Course"}
          </Button>
        </Grid>
        {course && (
          <Grid item xs={12}>
            <Button
              onClick={deleteCourse()}
              variant="contained"
              color="error"
              size="large"
              fullWidth
            >
              Delete this course
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CourseSettings;
