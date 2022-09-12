import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BackspaceIcon from "@mui/icons-material/Backspace";
import PublishIcon from "@mui/icons-material/Publish";
import Prerequisites from "../../Components/Dropdowns/FormLabels/Prerequisites";
import CourseImage from "../../Components/Cards/CourseImage/CourseImage";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../Features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setCode,
  setDescription,
  resetCreate,
} from "../../Features/forms/courseSettingsSlice";

const NewCourse = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, code, description, prerequisites } = useSelector(
    (state) => state.courseSettings
  );

  const [createCourse, { isLoading, isSuccess, isError, error }] =
    useCreateCourseMutation();

  //Setting initial Form Values with useState
  const [image, setImage] = useState({
    file: null,
    path: "",
    name: "",
    size: "",
  });

  const canSave = [title, code, description, !isLoading].every(Boolean);

  const resetCourse = () => {
    dispatch(resetCreate());
    setImage({
      file: null,
      path: "",
      name: "",
      size: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = new FormData();
    courseData.append("title", title);
    courseData.append("code", code);
    courseData.append("description", description);
    courseData.append("prerequisites", prerequisites);
    courseData.append("courseImage", image.file);

    if (canSave) {
      try {
        await createCourse(courseData).unwrap();
      } catch (err) {
        console.error("Failed to submit the course", err);
      }
    }

    if (isSuccess) {
      dispatch(resetCreate());
      navigate("/");
    }
  };

  let errorContent;

  if (isError) {
    errorContent = (
      <Stack direction="row" alignItems="center">
        <Typography
          variant="body1"
          color="error"
        >{`Something went wrong submitting this course: ${error?.data?.message}`}</Typography>
      </Stack>
    );
  }

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
          <Typography variant="h2">Create a New Course</Typography>
          <Box display="flex" gap={2}>
            <Button
              size="small"
              onClick={resetCourse}
              color="inherit"
              startIcon={<BackspaceIcon />}
            >
              Reset Fields
            </Button>
          </Box>
        </Grid>
        <CourseImage image={image} setImage={setImage} />
        <Grid xs={6} display="flex" flexDirection="column" gap={3}>
          <TextField
            name="title"
            value={title}
            id="title"
            label="Course Title"
            variant="outlined"
            required
            // helperText={"Ensure to add a unique course title."}
            fullWidth
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
          <TextField
            name="code"
            value={code}
            id="code"
            label="Course Code"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => dispatch(setCode(e.target.value))}
          />
          <Prerequisites />
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
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        </Grid>
        {errorContent}
        <Grid xs={12} display="flex" justifyContent="center">
          <LoadingButton
            startIcon={<PublishIcon />}
            loading={isLoading}
            loadingPosition="start"
            disabled={!canSave}
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            sx={{ width: "50%" }}
          >
            {isLoading ? "Submitting the course" : "Create New Course"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewCourse;
