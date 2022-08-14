import {
  Avatar,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllOrganizations,
  useGetOrganizationsQuery,
} from "../../../features/organization/organizationApiSlice";
import { setSponsorOrganization } from "../../../features/application/customApplicationSlice";
import { useStyles, MenuProps } from "./styles";

const OrganizationList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetOrganizationsQuery();
  const organizations = useSelector(selectAllOrganizations);
  const { sponsorOrganization } = useSelector(
    (state) => state.customApplication
  );
  return (
    <Grid item container xs={12} sm={6}>
      {isLoading && <CircularProgress />}
      <Typography>
        {isLoading && "Loading sponsor organizations ..."}
        {isError &&
          `Something went wrong while fetching sponsor organizations <br /> ${error}`}
        {isSuccess &&
          organizations.length < 1 &&
          "There are no sponsor organizations for your application"}
      </Typography>
      {isSuccess && organizations.length > 1 && (
        <FormControl variant="outlined" fullWidth>
          <InputLabel
            htmlFor="select-application-sponsor-organization"
            id="select-application-sponsor-organization"
          >
            Select application sponsor organization
          </InputLabel>
          <Select
            labelId="select-application-sponsor-organization"
            label="select-application-sponsor-organization"
            value={sponsorOrganization}
            onChange={(e) => dispatch(setSponsorOrganization(e.target.value))}
            renderValue={(sponsorOrganization) => sponsorOrganization.name}
            MenuProps={MenuProps}
          >
            {organizations.map((mappedOrganization) => {
              const labelId = `${
                mappedOrganization.id === sponsorOrganization?.id
                  ? "Remove"
                  : "Select"
              } ${mappedOrganization.name} as your application sponsor`;
              return (
                <MenuItem
                  key={mappedOrganization._id}
                  value={mappedOrganization}
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.circle}
                      alt={`${mappedOrganization.name}'s Logo`}
                      src={mappedOrganization.organizationLogo}
                    >
                      {mappedOrganization.name.substring(0, 2).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    labelId={labelId}
                    primary={mappedOrganization.name}
                    secondary={mappedOrganization.email}
                  />
                  <Checkbox
                    color="primary"
                    edge="end"
                    inputProps={{ "aria-labelledby": labelId }}
                    checked={
                      mappedOrganization._id === sponsorOrganization?._id
                    }
                  />
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>
            You may add a different organization by selecting the checkbox
            below.
          </FormHelperText>
        </FormControl>
      )}
    </Grid>
  );
};

export default OrganizationList;
