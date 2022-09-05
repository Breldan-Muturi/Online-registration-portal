import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
} from "../../Features/forms/customApplicationSlice";

const ProgramDates = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state) => state.customApplication
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container xs={6} spacing={2} p={1}>
        <Grid xs={6}>
          <DatePicker
            fullWidth
            id="startDate"
            label="Program Start Date"
            value={startDate}
            onChange={(newValue) => {
              dispatch(setStartDate(newValue.toISOString()));
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid xs={6}>
          <DatePicker
            id="endDate"
            label="Program End Date"
            value={endDate}
            onChange={(newValue) => {
              dispatch(setEndDate(newValue.toISOString()));
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default ProgramDates;
