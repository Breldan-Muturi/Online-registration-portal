import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BackspaceIcon from "@mui/icons-material/Backspace";
import PublishIcon from "@mui/icons-material/Publish";
import UpdateIcon from "@mui/icons-material/Update";
import React, { useState } from "react";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../features/course/courseApiSlice";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import { Prerequisites, CourseImage, DeleteCourse } from "../../components";

const CourseSettings = ({ course }) => {
  const classes = useStyles();
  const navigate = useNavigate();

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

  //Common states when updating or creating
  const loading = isLoading || isUpdating;
  const success = isSuccess || isUpdated;
  const hasError = isError || isFailedUpdate;

  //Setting initial Form Values with useState
  const [title, setTitle] = useState(course ? course.title : "");
  const [code, setCode] = useState(course ? course.code : "");
  const [description, setDescription] = useState(
    course ? course.description : ""
  );
  const [prerequisites, setPrerequisites] = useState(
    course ? course.prerequisites : []
  );
  const [courseImage, setCourseImage] = useState({
    file: course?.courseImage,
    path: course?.courseImage.path,
    name: course?.courseImage.name,
    size: course?.courseImage.size,
  });

  const canSave = [title, code, description, !loading].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = new FormData();
    course?.title !== title && courseData.append("title", title);
    course?.code !== code && courseData.append("code", code);
    course?.description !== description &&
      courseData.append("description", description);
    course?.prerequisites !== prerequisites &&
      courseData.append("prerequisites", prerequisites);
    course?.courseImage !== courseImage.file &&
      courseData.append("courseImage", courseImage.file);

    if (canSave) {
      try {
        course
          ? await updateCourse({ courseData, courseId: course._id })
          : await createCourse(courseData).unwrap();
      } catch (err) {
        console.error("Failed to submit the post", err);
      }
    }

    if (success) {
      setTitle("");
      setCode("");
      setDescription("");
      setPrerequisites([]);
      setCourseImage(null);
      navigate(`/`);
    }
  };

  const resetCourse = () => {
    setTitle(course ? course.title : "");
    setCode(course ? course.code : "");
    setDescription(course ? course.description : "");
    setPrerequisites(course ? course.prerequisites : []);
    setCourseImage({
      file: course?.courseImage,
      path: course?.courseImage.path,
      name: course?.courseImage.name,
      size: course?.courseImage.size,
    });
  };

  return (
    <Box className={classes.box} component="form" onSubmit={handleSubmit}>
      <Grid
        container
        xs={12}
        direction="row"
        spacing={3}
        justifyContent="space-between"
      >
        <Grid xs={12} display="flex" justifyContent="space-between">
          <Typography variant="h2">
            {course ? "Update this course" : "Create a New Course"}
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              size="small"
              onClick={resetCourse}
              color="inherit"
              startIcon={<BackspaceIcon />}
            >
              Reset Fields
            </Button>
            {course && <DeleteCourse />}
          </Box>
        </Grid>
        <CourseImage
          courseImage={courseImage}
          setCourseImage={setCourseImage}
        />
        <Grid xs={6} display="flex" flexDirection="column" gap={3}>
          <TextField
            name="title"
            value={title}
            id="title"
            label="Course Title"
            variant="outlined"
            required
            helperText={"Ensure to add a unique course title."}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="code"
            value={code}
            id="code"
            label="Course Code"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => setCode(e.target.value)}
          />
          <Prerequisites
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        </Grid>
        <Grid xs={12}>
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
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        {hasError && (
          <Grid container xs={12} alignItems="center">
            <Typography color="error">
              {`Something went wrong: ${
                (isError && error) || (isFailedUpdate && updateError)
              }`}
            </Typography>
          </Grid>
        )}
        <Grid xs={12} display="flex" justifyContent="center">
          <LoadingButton
            startIcon={course ? <PublishIcon /> : <UpdateIcon />}
            loading={loading}
            loadingPosition="start"
            disabled={!canSave}
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            sx={{ width: "50%" }}
          >
            {loading
              ? course
                ? "Updating the course"
                : "Submitting new course"
              : course
              ? "Update this course"
              : "Create New Course"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseSettings;
