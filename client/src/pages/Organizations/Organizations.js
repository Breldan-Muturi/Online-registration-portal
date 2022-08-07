import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import { Assignment, Delete } from "@material-ui/icons";
import { getOrganizations } from "../../features/organization/organizationSlice";

const Organizations = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);
  const { organizations, status, message } = useSelector(
    (state) => state.organization
  );
  const [organizationPage, setOrganizationPage] = useState(1);

  return (
    <Box p={3} className={classes.box}>
      {organizations?.length > 0 && status === "success" && (
        <Grid container>
          <List
            spacing={3}
            aria-labelledby="My organizations"
            subheader={
              <ListSubheader
                component="h3"
                className={classes.subheader}
                id="my-organizations"
              >
                My Organizations
              </ListSubheader>
            }
            className={classes.root}
          >
            {organizations
              .slice((organizationPage - 1) * 6, (organizationPage - 1) * 6 + 6)
              .map((mappedOrganization) => (
                <>
                  <ListItem key={mappedOrganization._id}>
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar
                        className={classes.circle}
                        alt={mappedOrganization.name}
                        src={mappedOrganization.organizationLogo}
                      >
                        {mappedOrganization?.name.substring(0, 2).toUpperCase()}
                      </Avatar>
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
                          {mappedOrganization.admins.indexOf(user._id) > -1 ? (
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
                </>
              ))}
            {Math.ceil(organizations?.length / 6) > 1 && (
              <Pagination
                count={Math.ceil(organizations?.length / 6)}
                onChange={(_, value) => setOrganizationPage(value)}
              />
            )}
          </List>
        </Grid>
      )}
      <Grid container direction="column">
        {organizations?.length === 0 && status === "success" && (
          <Typography color="error">
            You are not currently listed on any registered organizations.
          </Typography>
        )}
        {status === "loading" && (
          <>
            <CircularProgress />
            <Typography>Loading your organizations</Typography>
          </>
        )}
        {status === "failed" && (
          <Typography>
            Something went wrong while fetching your organizations: {message}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Organizations;
