import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../../features/session/sessionSlice";
import { Grid } from "@mui/material";

const ProgramDates = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (state) => state.customApplication
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          id="startDate"
          inputVariant="outlined"
          label="Program Start Date"
          format="dd/MM/yyyy"
          value={startDate}
          onChange={(date) => dispatch(setStartDate(date.toISOString()))}
          KeyboardButtonProps={{
            "aria-label": "Add the program start date",
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          id="endDate"
          inputVariant="outlined"
          label="Program End Date"
          format="dd/MM/yyyy"
          value={endDate}
          onChange={(date) => dispatch(setEndDate(date.toISOString()))}
          KeyboardButtonProps={{
            "aria-label": "Add the program end date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProgramDates;
