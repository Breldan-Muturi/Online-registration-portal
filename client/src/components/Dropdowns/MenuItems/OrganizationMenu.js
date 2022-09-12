import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import CustomAvatar from "../../../Custom/CustomAvatar";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrganizationsQuery } from "../../../Features/api/organizationApiSlice";
import { setSponsorOrganization } from "../../../Features/forms/customApplicationSlice";

const OrganizationMenu = ({ organizationId }) => {
  const dispatch = useDispatch();
  const { sponsorOrganization } = useSelector(
    (state) => state.customApplication
  );
  const {
    organization: { name, email, organizationLogo },
  } = useGetOrganizationsQuery("organizations", {
    selectFromResult: ({ data }) => ({
      organization: data?.entities[organizationId],
    }),
  });

  const labelId = `checkbox-list-secondary-label-${
    sponsorOrganization === organizationId ? "Des" : "s"
  }elect-${name}`;
  return (
    <ListItemButton
      divider
      selected={sponsorOrganization === organizationId}
      onClick={() => dispatch(setSponsorOrganization(organizationId))}
    >
      <ListItemAvatar>
        <CustomAvatar alt={`${name} organization logo`} src={organizationLogo}>
          {name.substring(0, 2).toUpperCase()}
        </CustomAvatar>
      </ListItemAvatar>
      <ListItemText id={labelId} primary={name} secondary={email} />
      <Checkbox
        color="primary"
        edge="end"
        inputProps={{ "aria-labelledby": labelId }}
        checked={sponsorOrganization === organizationId}
      />
    </ListItemButton>
  );
};

export default OrganizationMenu;
