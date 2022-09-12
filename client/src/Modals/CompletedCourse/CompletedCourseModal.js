import React, { useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import SelectedCompletions from "../../Components/MultiPreview/SelectedCompletions";
import useStyles from "./styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCompletedCourseMutation } from "../../Features/api/completedCoursesApiSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";
import { reset, setDate } from "../../Features/forms/completedCourseSlice";
import { newCompletionModal } from "../../Features/lists/completedCourseListSlice";
import CompletedCourse from "../../Components/Dropdowns/FormLabels/CompletedCourse";

const CompletedCourseModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useIsAdmin();
  const modalNewCompletion = useSelector((state) => state.completedCourseList);
  const { date, courseId } = useSelector((state) => state.completedCourse);
  const [evidence, setEvidence] = useState([]);
  const [createCompletedCourse, { isSuccess, isLoading, isError, error }] =
    useCreateCompletedCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completedCourseData = new FormData();
    completedCourseData.append("date", date);
    completedCourseData.append("courseId", courseId);
    completedCourseData.append("participant", userId);
    completedCourseData.append("createdBy", userId);
    Object.keys(evidence).forEach((key) => {
      completedCourseData.append("evidence", evidence.item(key));
    });
    try {
      await createCompletedCourse(completedCourseData).unwrap();
    } catch (err) {
      console.err(`Failed to submit the completed Course: ${err}`);
    } finally {
      dispatch(reset());
      setEvidence([]);
      dispatch(newCompletionModal());
    }
  };

  return (
    <>
      <Button
        size="small"
        startIcon={<UploadFileOutlined />}
        onClick={() => dispatch(newCompletionModal())}
      >
        Add completed course
      </Button>
      <Modal
        aria-labelledby="session-creation-modal"
        aria-describedby="modal-for-session-creation"
        open={modalNewCompletion}
        className={classes.modal}
        onClose={() => dispatch(newCompletionModal())}
        closeAfterTransition
      >
        <Fade in={modalNewCompletion}>
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
                    onChange={(newValue) =>
                      dispatch(setDate(newValue.toISOString()))
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <CompletedCourse />
                <SelectedCompletions
                  evidence={evidence}
                  setEvidence={setEvidence}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  startIcon={<UploadFileOutlined />}
                  loading={isLoading}
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
