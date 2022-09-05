import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Assignment from "@mui/icons-material/Assignment";
import Delete from "@mui/icons-material/Delete";
import CustomAvatar from "../../Custom/CustomAvatar";
import useStyles from "./styles";
import { selectOrganizationById } from "../../Features/api/organizationApiSlice";
import { useSelector } from "react-redux";
import useIsAdmin from "../../Hooks/useIsAdmin";

const Organization = ({ organizationId, index, organizationsCount }) => {
  const classes = useStyles();
  const { isAdmin, isOrgAdmin } = useIsAdmin(organizationId);
  const { name, organizationLogo } = useSelector((state) =>
    selectOrganizationById(state, organizationId)
  );
  return (
    <>
      <ListItem
        secondaryAction={
          (isOrgAdmin || isAdmin) && (
            <>
              <Tooltip title="Manage Organization" arrow>
                <IconButton
                  LinkComponent="a"
                  href={`${organizationId}/applications`}
                  color="primary"
                  edge="end"
                  aria-label="manage-company"
                >
                  <Assignment />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Organization" arrow>
                <IconButton
                  color="error"
                  edge="end"
                  aria-label="remove-company"
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </>
          )
        }
      >
        <ListItemAvatar>
          <CustomAvatar
            className={classes.avatar}
            alt={name}
            src={organizationLogo}
          >
            {name.substring(0, 2).toUpperCase()}
          </CustomAvatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography>{`${index + 1} ${name}`}</Typography>}
          secondary={
            <>
              {!isAdmin && (
                <Stack direction="row" gap={1}>
                  <Typography>Role:</Typography>
                  <Typography>{isOrgAdmin ? "Admin" : "Member"}</Typography>
                </Stack>
              )}
              {(isOrgAdmin || isAdmin) && (
                <Typography variant="body2">
                  Go to Administration Page
                </Typography>
              )}
            </>
          }
          disableTypography
        />
      </ListItem>
      {index + 1 !== organizationsCount && (
        <Divider variant="middle" component="li" />
      )}
    </>
  );
};

export default Organization;
