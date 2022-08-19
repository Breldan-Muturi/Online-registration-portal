import React from "react";
import {
  Grid,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { ProgramDates, TopicCardList } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseId,
  setDeliveryType,
  setVenue,
  toggleIsTopics,
} from "../../features/application/customApplicationSlice";
import {
  selectAllCourses,
  useGetCoursesQuery,
} from "../../features/course/courseApiSlice";
import { useStyles } from "./styles";
import { deliveryTypes, venues } from "../../helpers";

const ProgramInfo = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const courses = useSelector(selectAllCourses);
  const { isSuccess } = useGetCoursesQuery();
  const {
    courseId,
    isTopics,
    searchTopicsByCourse,
    searchTopicsByTitle,
    venue,
    deliveryType,
  } = useSelector((state) => state.customApplication);
  const handleTopicsCourse = () => {};
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h3">Program Information</Typography>
        <Typography>
          Choose one of the courses listed below or pick specific topics to be
          covered in the program.
        </Typography>
      </Grid>
      {!isTopics && (
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            id="select-application-course"
            label="Select Course"
            name="courseId"
            value={courseId}
            onChange={(e) => dispatch(setCourseId(e.target.value))}
            helperText="Select the application course"
            variant="outlined"
          >
            {!isSuccess && <MenuItem disabled>Loading courses</MenuItem>}
            {isSuccess &&
              courses.map((mappedCourse) => (
                <MenuItem key={mappedCourse._id} value={mappedCourse._id}>
                  {mappedCourse.title}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      )}
      <Grid item xs={6}>
        <FormControlLabel
          name="isTopics"
          value={isTopics}
          control={
            <Checkbox
              checked={isTopics}
              onChange={() => dispatch(toggleIsTopics())}
              name="isTopics"
              color="primary"
            />
          }
          label={
            isTopics
              ? "Uncheck to select one of the listed courses"
              : "Choose training on specific topics instead."
          }
        />
      </Grid>
      {isTopics && isSuccess && (
        <>
          <Grid item container direction="column" xs={12}>
            <Typography variant="subtitle2" color="primary">
              Filter topics with the search inputs provided. Add and remove
              topics with the "Add Topic" and "Remove Topic" buttons or by
              dragging and dropping over the drop areas provided.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="searchTopicsByCourse"
              value={searchTopicsByCourse}
              id="searchTopicsByCourse"
              label="Search Topics By Course"
              variant="outlined"
              fullWidth
              onChange={handleTopicsCourse}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="searchTopicsByTitle"
              value={searchTopicsByTitle}
              id="searchTopicsByTitle"
              label="Search Topics By Title"
              variant="outlined"
              fullWidth
              onChange={(e) => dispatch(searchTopicsByTitle(e.target.value))}
            />
          </Grid>
          <TopicCardList />
        </>
      )}
      <ProgramDates />
      <Grid
        container
        direction="row"
        spacing={3}
        sx={{ width: "50%", marginTop: "16px" }}
      >
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            id="select-delievery-type"
            label="Select Delivery Mode"
            value={deliveryType}
            onChange={(e) => dispatch(setDeliveryType(e.target.value))}
            variant="outlined"
          >
            {deliveryTypes.map((mappedDelivery) => (
              <MenuItem key={mappedDelivery.value} value={mappedDelivery.value}>
                {mappedDelivery.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            id="select-venue"
            label="Select Program Venue"
            value={venue}
            onChange={(e) => dispatch(setVenue(e.target.value))}
            variant="outlined"
          >
            {venues.map((mappedVenue) => (
              <MenuItem key={mappedVenue.value} value={mappedVenue.value}>
                {mappedVenue.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};

export default ProgramInfo;
