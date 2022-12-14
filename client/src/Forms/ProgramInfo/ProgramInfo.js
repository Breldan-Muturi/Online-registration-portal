import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import deliveryTypes from "../../Helpers/DeliveryTypes";
import venues from "../../Helpers/Venues";
import TopicCardList from "../../Containers/Topics/TopicCardList";
import ProgramDates from "../../Components/DatePickers/ProgramDates";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCourses,
  useGetCoursesQuery,
} from "../../Features/api/courseApiSlice";
import {
  setCourseId,
  setDeliveryType,
  setVenue,
  toggleIsTopics,
} from "../../Features/forms/customApplicationSlice";

const ProgramInfo = () => {
  const dispatch = useDispatch();
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
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography variant="h3">Program Information</Typography>
        <Typography>
          Choose one of the courses listed below or pick specific topics to be
          covered in the program.
        </Typography>
      </Grid>
      {!isTopics && (
        <Grid xs={12} sm={6}>
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
      <Grid xs={6}>
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
          <Grid xs={12}>
            <Typography variant="subtitle2" color="primary">
              Filter topics with the search inputs provided. Add and remove
              topics with the "Add Topic" and "Remove Topic" buttons or by
              dragging and dropping over the drop areas provided.
            </Typography>
          </Grid>
          <Grid xs={6}>
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
          <Grid xs={6}>
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
      <Grid xs={3}>
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
      <Grid item xs={3}>
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
  );
};

export default ProgramInfo;
