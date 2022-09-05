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

const CompletedCourses = () => {
  const dispatch = useDispatch();
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
  } = useGetCompletedCoursesQuery();

  let content;

  if (isSuccess) {
    const { ids: completedCourseIds } = completedCourses;
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
              My Completed Courses
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
  } else {
    content = (
      <Stack
        direction="row"
        alignContent="center"
        justifyContent="flex-start"
        p={3}
        gap={3}
      >
        {isLoading && <CircularProgress />}
        <Typography color={isError && "error"}>
          {isLoading
            ? "Loading completed courses"
            : `There was an error loading completed courses. Check your internet connectivity ${console.log(
                error?.data
              )}`}
        </Typography>
      </Stack>
    );
  }

  return (
    <Box p={3} m={4}>
      {content}
    </Box>
  );
};

export default CompletedCourses;
