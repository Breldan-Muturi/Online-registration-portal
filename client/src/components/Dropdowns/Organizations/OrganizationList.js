import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import MenuProps from "../../../Helpers/MenuProps";
import CustomAvatar from "../../../Custom/CustomAvatar";
import { setSponsorOrganization } from "../../../Features/forms/customApplicationSlice";
import { selectCurrentToken } from "../../../Features/global/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllOrganizations,
  useGetOrganizationsQuery,
} from "../../../Features/api/organizationApiSlice";

const OrganizationList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const { isLoading, isSuccess, isError, error } = useGetOrganizationsQuery();
  const organizations = useSelector(selectAllOrganizations);
  const { sponsorOrganization } = useSelector(
    (state) => state.customApplication
  );
  const success = [isSuccess, token, organizations.length].every(Boolean);
  const noOrganizations = [isSuccess, token, !organizations.length].every(
    Boolean
  );
  return (
    <Grid item container xs={12} sm={6}>
      {isLoading && <CircularProgress />}
      <Typography>
        {isLoading && "Loading sponsor organizations ..."}
        {isError &&
          `Something went wrong while fetching sponsor organizations <br /> ${error?.data}`}
        {noOrganizations &&
          "There are no sponsor organizations for your application"}
      </Typography>
      {success && (
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
            value={sponsorOrganization || ""}
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
                    <CustomAvatar
                      className={classes.circle}
                      alt={`${mappedOrganization.name}'s Logo`}
                      src={mappedOrganization.organizationLogo}
                    >
                      {mappedOrganization.name.substring(0, 2).toUpperCase()}
                    </CustomAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    labelid={labelId}
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
