import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCourses,
  useGetCoursesQuery,
} from "../../features/course/courseApiSlice";
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { sponsors, deliveryTypes, venues } from "./options";
import useStyles from "./styles";
import {
  OrganizationCustom,
  OrganizationList,
  SelectedUsers,
  TopicCardList,
  UserList,
} from "../../components";
import {
  setCourseId,
  setDeliveryType,
  setSponsorType,
  toggleIsTopics,
  setEndDate,
  setStartDate,
  setVenue,
  setParticipants,
  addSingleParticipant,
  toggleIsOnlyParticipant,
  toggleIsNewOrganization,
} from "../../features/application/customApplicationSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

const CustomApplication = () => {
  const user = useSelector(selectCurrentUser);
  const { isSuccess } = useGetCoursesQuery();
  const classes = useStyles();
  const dispatch = useDispatch();
  const courses = useSelector(selectAllCourses);
  const {
    sponsorType,
    courseId,
    isTopics,
    searchTopicsByCourse,
    searchTopicsByTitle,
    startDate,
    endDate,
    deliveryType,
    venue,
    participants,
    isOnlyParticipant,
    isNewOrganization,
  } = useSelector((state) => state.customApplication);
  const handleTopicsCourse = (event) => {};

  return (
    <form className={classes.form}>
      <Grid
        container
        direction="row"
        spacing={3}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item container direction="column" xs={12}>
          <Typography variant="h2">In house training application</Typography>
          <Typography variant="subtitle2">
            Complete the form below to create a custom application. After the
            KIPPRA Training Team completes and approves the application, you
            will receive an offer letter and proforma invoice.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            name="sponsorType"
            value={sponsorType}
            id="select-application-sponsor"
            label="Select Sponsor Type"
            onChange={(e) => dispatch(setSponsorType(e.target.value))}
            helperText="Select one of the provided sponsor types"
            variant="outlined"
          >
            {sponsors.map((mappedSponsor) => (
              <MenuItem key={mappedSponsor.value} value={mappedSponsor.value}>
                {mappedSponsor.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <OrganizationList />
        <Grid item xs={12}>
          <FormControlLabel
            name="isNewOrganization"
            value={isNewOrganization}
            control={
              <Checkbox
                checked={isNewOrganization}
                onChange={() => dispatch(toggleIsNewOrganization())}
                name="isNewOrganization"
                color="primary"
              />
            }
            label="Add a different organization to sponsor this application."
          />
        </Grid>
        <OrganizationCustom />
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
            label="Choose training on specific topics instead."
          />
        </Grid>
        {isTopics && isSuccess && (
          <>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h3">
                Select topics for this in house training.
              </Typography>
              <Typography>
                Drag and drop to add a topic. Alteratively, click the "add
                topic" button.
              </Typography>
              <Typography variant="subtitle2" color="primary">
                Filter the topics list with the search inputs provided below.
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
        <Grid item xs={3}>
          <TextField
            name="startDate"
            value={startDate}
            id="startDate"
            label="Program Start Date"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setStartDate(e.target.value))}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="endDate"
            value={endDate}
            id="endDate"
            label="Program End Date"
            variant="outlined"
            fullWidth
            onChange={(e) => dispatch(setEndDate(e.target.value))}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            fullWidth
            id="select-delievery-type"
            label="Select Delivery Type"
            value={deliveryType}
            onChange={(e) => dispatch(setDeliveryType(e.target.value))}
            helperText="Choose between online and on premises delivery"
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
            label="Select Venue"
            value={venue}
            onChange={(e) => dispatch(setVenue(e.target.value))}
            helperText="Select in-house training venue"
            variant="outlined"
          >
            {venues.map((mappedVenue) => (
              <MenuItem key={mappedVenue.value} value={mappedVenue.value}>
                {mappedVenue.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {!isOnlyParticipant && (
          <>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h3">Participation Details</Typography>
              <Typography>
                Select participants from your organizations.
              </Typography>
              <Typography variant="subtitle2" color="primary">
                Enter your desired participants email address.
              </Typography>
            </Grid>
            <UserList />
          </>
        )}
        <SelectedUsers />
        <Grid item xs={12}>
          <FormControlLabel
            name="isOnlyParticipant"
            value="isOnlyParticipant"
            control={
              <Checkbox
                checked={
                  participants.length === 1 && participants.includes(user.id)
                }
                onChange={() => (
                  // eslint-disable-next-line
                  dispatch(toggleIsOnlyParticipant()),
                  dispatch(
                    participants.includes(user.id)
                      ? setParticipants([])
                      : addSingleParticipant(user.id)
                  )
                )}
                name="isOnlyParticipant"
                color="primary"
              />
            }
            label="I am the only participant for this application."
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CustomApplication;
