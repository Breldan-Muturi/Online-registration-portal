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
import SelectedCompletions from "../../Components/MultiPreview/SelectedCompletions";
import useStyles from "./styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { selectCurrentUser } from "../../Features/global/authSlice";
import { useSelector } from "react-redux";
import { useCreateCompletedCourseMutation } from "../../Features/api/completedCoursesApiSlice";
import { selectAllCourses } from "../../Features/api/courseApiSlice";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completedCourseData = new FormData();
    completedCourseData.append("date", date);
    completedCourseData.append("courseId", course);
    completedCourseData.append("participant", user.id);
    completedCourseData.append("createdBy", user.id);
    Object.keys(evidence).forEach((key) => {
      completedCourseData.append("evidence", evidence.item(key));
    });
    try {
      await createCompletedCourse(completedCourseData).unwrap();
    } catch (err) {
      console.err(`Failed to submit the completed Course: ${err}`);
    } finally {
      setDate(new Date().toISOString());
      setCourse("");
      setEvidence([]);
      setOpen(!open);
    }
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
