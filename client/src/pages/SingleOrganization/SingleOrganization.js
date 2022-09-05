import React from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "./styles";
import CustomToolbar from "../../Custom/CustomToolbar";
import StyledTab from "../../Custom/StyledTab";
import useOrganizationNav from "../../Hooks/useOrganizationNav";
import { Outlet } from "react-router-dom";
import { useGetOrganizationByIdQuery } from "../../Features/api/organizationApiSlice";
import CustomAvatar from "../../Custom/CustomAvatar";

function a11yProps(index) {
  return {
    component: "a",
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SingleOrganization = () => {
  const classes = useStyles();
  const { routes, organizationId, pathname } = useOrganizationNav();
  const {
    data: organization,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationByIdQuery(organizationId);

  let content = (
    <Stack spacing={3} direction="row">
      <CircularProgress />
      <Typography>Loading organization content</Typography>
    </Stack>
  );

  if (isSuccess) {
    content = <Outlet />;
  } else if (isError) {
    content = (
      <Typography>
        Something went wrong: <br />
        {error}
      </Typography>
    );
  }

  return (
    <Box component="section" className={classes.section}>
      <div className={classes.header}>
        {isSuccess && (
          <Stack p={3} gap={3} direction="row" alignItems="center">
            <CustomAvatar
              size="large"
              alt={`${organization.name} organization logo`}
              src={organization.organizationLogo}
            >
              {organization.name.substring(0, 2).toUpperCase()}
            </CustomAvatar>
            <Typography variant="h4" component="h2" className={classes.title}>
              {organization.name}
            </Typography>
          </Stack>
        )}
      </div>
      <CustomToolbar variant="dense" className={classes.toolbar}>
        <Tabs
          value={pathname}
          indicatorColor="primary"
          className={classes.tabs}
          classes={{
            button: classes.button,
          }}
          aria-label="Organization page tabs"
        >
          <StyledTab
            label="Applications"
            href={routes[0]}
            value={routes[0]}
            {...a11yProps(0)}
          />
          <StyledTab
            label="Members"
            href={routes[1]}
            value={routes[1]}
            {...a11yProps(1)}
          />
          <StyledTab
            label="Payments"
            href={routes[2]}
            value={routes[2]}
            {...a11yProps(2)}
          />
          <StyledTab
            label="Organization Settings"
            href={routes[3]}
            value={routes[3]}
            {...a11yProps(3)}
          />
        </Tabs>
      </CustomToolbar>
      <Box p={3} component="section">
        {content}
      </Box>
    </Box>
  );
};

export default SingleOrganization;
