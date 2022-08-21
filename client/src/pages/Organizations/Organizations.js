import React, { useState } from "react";
import Pagination from "@mui/lab/Pagination";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Assignment, Delete } from "@mui/icons-material";
import {
  selectAllOrganizations,
  useGetOrganizationsQuery,
} from "../../features/organization/organizationApiSlice";
import { CenterList, CustomAvatar, Subheader } from "../../Custom";

const Organizations = () => {
  const classes = useStyles();
  const { isLoading, isSuccess, isError, error } = useGetOrganizationsQuery();
  const organizations = useSelector(selectAllOrganizations);
  const { user } = useSelector((state) => state.auth);
  const [organizationPage, setOrganizationPage] = useState(1);

  return (
    <Box p={3} className={classes.box}>
      {organizations?.length > 0 && isSuccess && (
        <Grid container>
          <CenterList
            spacing={3}
            aria-labelledby="My organizations"
            subheader={
              <Subheader component="h3" id="my-organizations">
                My Organizations
              </Subheader>
            }
          >
            {organizations
              .slice((organizationPage - 1) * 6, (organizationPage - 1) * 6 + 6)
              .map((mappedOrganization) => (
                <React.Fragment key={mappedOrganization._id}>
                  <ListItem key={mappedOrganization._id}>
                    <ListItemAvatar className={classes.avatar}>
                      <CustomAvatar
                        className={classes.circle}
                        alt={mappedOrganization.name}
                        src={mappedOrganization.organizationLogo}
                      >
                        {mappedOrganization?.name.substring(0, 2).toUpperCase()}
                      </CustomAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography>
                          {organizations.indexOf(mappedOrganization) + 1}.{" "}
                          {mappedOrganization.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          Role:
                          {mappedOrganization.admins.indexOf(user.id) > -1 ? (
                            <>
                              <b> Admin</b>
                              <br />
                              <span color="primary" component="Link">
                                Go to Administration Page
                              </span>
                            </>
                          ) : (
                            <b> Member</b>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Manage Organization" arrow>
                        <IconButton edge="end" aria-label="manage-company">
                          <Assignment color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Organization" arrow>
                        <IconButton edge="end" aria-label="remove-company">
                          <Delete className={classes.iconred} />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {organizations.indexOf(mappedOrganization) + 1 !==
                    organizations.length && (
                    <Divider variant="middle" component="li" />
                  )}
                </React.Fragment>
              ))}
            {Math.ceil(organizations?.length / 6) > 1 && (
              <Pagination
                count={Math.ceil(organizations?.length / 6)}
                onChange={(_, value) => setOrganizationPage(value)}
              />
            )}
          </CenterList>
        </Grid>
      )}
      <Grid container direction="column">
        {organizations?.length === 0 && isSuccess && (
          <Typography color="error">
            You are not currently listed on any registered organizations.
          </Typography>
        )}
        {isLoading && (
          <>
            <CircularProgress />
            <Typography>Loading your organizations</Typography>
          </>
        )}
        {isError && (
          <Typography>
            {`Something went wrong while fetching your organizations: ${error}`}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Organizations;
