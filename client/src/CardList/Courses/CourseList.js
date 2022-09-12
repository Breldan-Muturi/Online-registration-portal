import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CourseItem from "../../Components/Cards/CourseItem/CourseItem";
import Pagination from "@mui/material/Pagination";
import { useGetCoursesQuery } from "../../Features/api/courseApiSlice";

const CourseList = () => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery("courses", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [coursePage, setCoursePage] = useState(1);

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" gap={1} alignItems="center">
        <CircularProgress />
        <Typography>Loading portal courses ...</Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Typography color="error">{`Something went wrong loading portal courses ${error?.data?.message}`}</Typography>
    );
  }

  if (isSuccess) {
    const { ids } = courses;
    if (!ids?.length) {
      content = (
        <Typography color="error">
          There are no courses available on the portal at this time.
        </Typography>
      );
    }
    if (ids.length) {
      const coursesContent = ids
        .slice((coursePage - 1) * 6, (coursePage - 1) * 6 + 6)
        .map((courseId) => <CourseItem key={courseId} courseId={courseId} />);
      content = (
        <>
          <Typography variant="h2" color="error">
            {`Our Training ${ids.length} Programme${ids.length > 1 && "s"}`}
          </Typography>
          <Grid container xs={12} spacing={3}>
            {coursesContent}
          </Grid>
          <Pagination
            count={Math.ceil(ids?.length / 6)}
            onChange={(_, value) => setCoursePage(value)}
          />
        </>
      );
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} p={4}>
      {content}
    </Box>
  );
};

export default CourseList;
