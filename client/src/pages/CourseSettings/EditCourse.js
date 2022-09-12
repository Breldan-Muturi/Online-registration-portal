import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BackspaceIcon from "@mui/icons-material/Backspace";
import UpdateIcon from "@mui/icons-material/Update";
import Prerequisites from "../../Components/Dropdowns/FormLabels/Prerequisites";
import CourseImage from "../../Components/Cards/CourseImage/CourseImage";
import DeleteCourse from "../../Components/Dialogs/DeleteCourse";
import useStyles from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCoursesQuery,
  useUpdateCourseMutation,
} from "../../Features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setCode,
  setDescription,
  resetUpdate,
} from "../../Features/forms/courseSettingsSlice";
const EditCourse = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course, prerequisites } = useGetCoursesQuery("courses", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
      prerequisites: data?.entities[courseId].prerequisites.filter(
        (prerequisiteId) => data?.ids.includes(prerequisiteId)
      ),
    }),
  });
  const { title, code, description, courseImage } = course;
  const { path, size, name } = courseImage;

  const initialData = {
    title,
    code,
    description,
    courseImage,
    prerequisites,
  };

  const {
    title: formTitle,
    code: formCode,
    description: formDescription,
    prerequisites: formPrerequisites,
  } = useSelector((state) => state.courseSettings);

  const [image, setImage] = useState({
    file: courseImage,
    path: `http://localhost:8000/${path}`,
    name: name,
    size: size,
  });

  const [updateCourse, { isLoading, isSuccess, isError, error }] =
    useUpdateCourseMutation();

  useEffect(() => {
    dispatch(resetUpdate(initialData));
    setImage({
      file: courseImage,
      path: `http://localhost:8000/${path}`,
      name: name,
      size: size,
    });
  }, [dispatch, course]);

  const canSave = [formTitle, formCode, formDescription, !isLoading].every(
    Boolean
  );

  const resetCourse = () => {
    dispatch(resetUpdate());
    setImage({
      file: courseImage,
      path: `http://localhost:8000/${path}`,
      name: name,
      size: size,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = new FormData();
    title !== formTitle && courseData.append("title", formTitle);
    code !== formCode && courseData.append("code", formCode);
    description !== formDescription &&
      courseData.append("description", formDescription);
    prerequisites !== formPrerequisites &&
      courseData.append("prerequisites", formPrerequisites);
    courseImage !== image.file && courseData.append("courseImage", image.file);

    if (canSave) {
      try {
        await updateCourse({ courseData, courseId });
      } catch (err) {
        console.error("Failed to submit the post", err);
      }
    }

    if (isSuccess) {
      resetCourse();
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
        >{`Something went wrong updating this course: ${error?.data?.message}`}</Typography>
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
          <Typography variant="h2">Update this course</Typography>
          <Box display="flex" gap={2}>
            <Button
              size="small"
              onClick={resetCourse}
              color="inherit"
              startIcon={<BackspaceIcon />}
            >
              Reset Fields
            </Button>
            <DeleteCourse />
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
            helperText={"Ensure to add a unique course title."}
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
          <Prerequisites courseId={courseId} />
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
            startIcon={<UpdateIcon />}
            loading={isLoading}
            loadingPosition="start"
            disabled={!canSave}
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            sx={{ width: "50%" }}
          >
            {isLoading ? "Updating the course" : "Update this course"}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditCourse;
