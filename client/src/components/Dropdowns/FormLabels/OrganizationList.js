import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import MenuProps from "../../../Helpers/MenuProps";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrganizationsQuery } from "../../../Features/api/organizationApiSlice";
import OrganizationMenu from "../MenuItems/OrganizationMenu";

const OrganizationList = () => {
  const { sponsorOrganization } = useSelector(
    (state) => state.customApplication
  );
  const {
    data: organizations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationsQuery("organizations", {
    pollingInterval: 15000,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={1} alignItems="center" p={1}>
        <CircularProgress />
        <Typography variant="body1">
          Loading sponsor organizations...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography
        variant="body1"
        color="error"
      >{`Something went wrong loading courses ${error?.data?.message}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids, entities } = organizations;
    if (!ids.length) {
      content = (
        <Typography variant="body1" color="error">
          There are no available sponsor organizations
        </Typography>
      );
    }
    if (ids.length) {
      const organizationIds = [...ids];
      content = (
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
            defaultValue=""
            value={sponsorOrganization}
            renderValue={(sponsorOrganization) =>
              entities[sponsorOrganization].name
            }
            MenuProps={MenuProps}
          >
            {organizationIds.map((organizationId) => (
              <OrganizationMenu
                key={organizationId}
                value={organizationId}
                organizationId={organizationId}
              />
            ))}
          </Select>
          <FormHelperText>
            You may add a different organization by selecting the checkbox
            below.
          </FormHelperText>
        </FormControl>
      );
    }
  }

  return (
    <Grid xs={12} sm={6}>
      {content}
    </Grid>
  );
};

export default OrganizationList;
