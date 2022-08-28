import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import useStyles from "./styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useCreateCompletedCourseMutation } from "../../features/completedCourse/completedCoursesApiSlice";
import { selectAllCourses } from "../../features/course/courseApiSlice";
import SelectedCompletions from "../../components/SelectedCompletions/SelectedCompletions";

const CompletedCourseModal = () => {
  const classes = useStyles();
  const user = useSelector(selectCurrentUser);
  const courses = useSelector(selectAllCourses);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());
  const [course, setCourse] = useState("");
  const [evidence, setEvidence] = useState([]);
  const [createCompletedCourse, { isSuccess, isLoading, isError, error }] =
    useCreateCompletedCourseMutation();

  const handleSubmit = async () => {
    const completedCourseData = new FormData();
    completedCourseData.append("date", date);
    completedCourseData.append("course", course);
    completedCourseData.append("evidence", evidence);
    await createCompletedCourse(completedCourseData);
  };

  return (
    <>
      <Button
        size="small"
        startIcon={<UploadFileOutlined />}
        onClick={() => setOpen(!open)}
      >
        Add completed course
      </Button>
      <Modal
        aria-labelledby="session-creation-modal"
        aria-describedby="modal-for-session-creation"
        open={open}
        className={classes.modal}
        onClose={() => setOpen(!open)}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Typography variant="subtitle1">
                Submit Completed Course
              </Typography>
            </AppBar>
            <form onSubmit={handleSubmit} className={classes.div}>
              <Grid display="flex" flexDirection="column" gap={2} p={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id="date"
                    label="Completion Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue.toISOString())}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  select
                  fullWidth
                  id="select-application-course"
                  label="Select Completed Course"
                  name="courseId"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  helperText="Select the completed course"
                  variant="outlined"
                >
                  {courses.map((mappedCourse) => (
                    <MenuItem key={mappedCourse._id} value={mappedCourse._id}>
                      {mappedCourse.title}
                    </MenuItem>
                  ))}
                </TextField>
                <SelectedCompletions
                  evidence={evidence}
                  setEvidence={setEvidence}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  startIcon={<UploadFileOutlined />}
                  fullWidth
                  size="large"
                >
                  Submit Completed Course
                </LoadingButton>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CompletedCourseModal;
