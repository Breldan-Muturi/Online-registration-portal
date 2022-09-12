import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomAvatar from "../../Custom/CustomAvatar";
import { useGetOrganizationsQuery } from "../../Features/api/organizationApiSlice";

const Organization = ({ organizationId }) => {
  const {
    organization: { name, email, organizationLogo },
  } = useGetOrganizationsQuery("organizations", {
    selectFromResult: ({ data }) => ({
      organization: data?.entities[organizationId],
    }),
  });

  return (
    <Stack direction="row" gap={1}>
      <CustomAvatar alt={`${name}'s organization logo`} src={organizationLogo}>
        {name.substring(0, 2).toUpperCase()}
      </CustomAvatar>
      <Stack direction="column">
        <Typography variant="h3">{name}</Typography>
        <Typography variant="body2">{email}</Typography>
      </Stack>
      z
    </Stack>
  );
};

export default Organization;
