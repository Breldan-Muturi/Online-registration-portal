import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import CenterList from "../Custom/CenterList";
import CompletedCourseModal from "../Modals/CompletedCourse/CompletedCourseModal";
import CompletedCourse from "../Components/ListItem/CompletedCourse";
import { useGetCompletedCoursesQuery } from "../Features/api/completedCoursesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCompletions } from "../Features/lists/completedCourseListSlice";
import DeleteSelectedCompletions from "../Components/Dialogs/DeleteSelectedCompletions";
import useIsAdmin from "../Hooks/useIsAdmin";

const CompletedCourses = () => {
  const dispatch = useDispatch();
  const { userId, isAdmin } = useIsAdmin();
  const selectedCompletions = useSelector(
    (state) => state.completedCourseList.selectedCompletions
  );
  const [page, setPage] = useState(1);

  const {
    data: completedCourses,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetCompletedCoursesQuery("completedCourses", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content;

  if (isLoading) {
    content = (
      <Stack direction="row" p={3} alignItems="center" gap={1}>
        <CircularProgress />
        <Typography>{`Loading ${
          isAdmin ? "portal" : "your"
        } completed courses`}</Typography>
      </Stack>
    );
  }

  if (isError) {
    content = (
      <Stack p={3}>
        <Typography color="error">{`Something went wrong loading ${
          !isAdmin && "your"
        } course completions ${error?.data?.message}`}</Typography>
      </Stack>
    );
  }

  if (isSuccess) {
    const { ids, entities } = completedCourses;
    const completedCourseIds = isAdmin
      ? [...ids]
      : ids.filter(
          (completedCourseId) =>
            entities[completedCourseId].participant === userId
        );
    if (!completedCourseIds.length) {
      content = (
        <Stack p={3}>
          <Typography color="error">{`${
            isAdmin ? "There are" : "You have"
          } no completed course submissions yet.`}</Typography>
        </Stack>
      );
    }

    if (completedCourseIds.length) {
      content = (
        <CenterList
          spacing={3}
          aria-labelledby="Completed Courses"
          subheader={
            <Stack
              direction="column"
              p={2}
              spacing={3}
              justifyContent="space-between"
            >
              <Typography color="primary" variant="h3">
                {`${isAdmin ? "Portal's" : "My"} ${
                  completedCourseIds.length
                } Completed Course Submissions`}
              </Typography>
              <Box
                display="flex"
                alignContent="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      label={`${
                        selectedCompletions.length ? "Des" : "S"
                      }elect All`}
                      indeterminate={
                        selectedCompletions.length > 0 &&
                        selectedCompletions.length !== completedCourseIds.length
                      }
                      checked={
                        selectedCompletions.length === completedCourseIds.length
                      }
                      onChange={() =>
                        dispatch(
                          selectAllCompletions(
                            selectedCompletions.length ? [] : completedCourseIds
                          )
                        )
                      }
                    />
                  }
                  label={`${selectedCompletions.length ? "Des" : "S"}elect All`}
                  componentsProps={{ typography: { variant: "button" } }}
                />
                <Box display="flex" gap={2}>
                  <DeleteSelectedCompletions />
                  <CompletedCourseModal />
                </Box>
              </Box>
            </Stack>
          }
        >
          {completedCourseIds
            .slice((page - 1) * 6, (page - 1) * 6 + 6)
            .map((completedCourseId, index) => (
              <CompletedCourse
                key={index}
                index={index}
                completedCourseId={completedCourseId}
                completioncount={completedCourseIds.length}
              />
            ))}
        </CenterList>
      );
    }
  }

  return (
    <Box p={3} m={4}>
      {content}
    </Box>
  );
};

export default CompletedCourses;
