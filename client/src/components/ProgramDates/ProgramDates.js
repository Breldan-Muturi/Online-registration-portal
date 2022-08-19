import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
} from "../../features/application/customApplicationSlice";
import { Grid, TextField } from "@mui/material";

const ProgramDates = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state) => state.customApplication
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid
        item
        container
        sx={{ width: "50%", marginTop: "16px", gap: "64px" }}
      >
        <DatePicker
          id="startDate"
          label="Program Start Date"
          value={startDate}
          onChange={(newValue) => {
            dispatch(setStartDate(newValue.toISOString()));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          id="endDate"
          label="Program End Date"
          value={endDate}
          onChange={(newValue) => {
            dispatch(setEndDate(newValue.toISOString()));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default ProgramDates;
