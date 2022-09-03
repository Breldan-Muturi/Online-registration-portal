import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/lab/Pagination";
import CenterList from "../../Custom/CenterList";
import Subheader from "../../Custom/Subheader";
import { useGetOrganizationsQuery } from "../../Features/api/organizationApiSlice";
import Organization from "../../Components/ListItem/Organization";

const Organizations = () => {
  const {
    data: organizations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationsQuery();
  const [organizationPage, setOrganizationPage] = useState(1);
  let content;
  if (isSuccess) {
    const { ids: organizationIds } = organizations;
    content = (
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
          {organizationIds
            .slice((organizationPage - 1) * 6, (organizationPage - 1) * 6 + 6)
            .map((mappedOrganizationId, index) => (
              <Organization
                key={index}
                organizationId={mappedOrganizationId}
                index={index}
                organizationsCount={organizationIds.length}
              />
            ))}
          {Math.ceil(organizationIds.length / 6) > 1 && (
            <Pagination
              count={Math.ceil(organizations.length / 6)}
              onChange={(_, value) => setOrganizationPage(value)}
            />
          )}
        </CenterList>
      </Grid>
    );
  } else if (isSuccess && organizations.length === 0) {
    content = (
      <Grid container direction="row">
        <Typography color="error">
          You are not currently listed on any registered organizations.
        </Typography>
      </Grid>
    );
  } else if (isLoading) {
    content = (
      <Stack direction="row" gap={2} alignItems="center">
        <CircularProgress />
        <Typography>Loading your organizations</Typography>
      </Stack>
    );
  } else if (isError) {
    content = (
      <Typography>
        {`Something went wrong while fetching your organizations: ${error}`}
      </Typography>
    );
  }

  return (
    <Box p={3} m={4} gap={4}>
      {content}
    </Box>
  );
};

export default Organizations;
