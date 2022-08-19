import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
  stepper: {
    backgroundColor: "transparent",
    width: "100%",
    padding: theme.spacing(4),
  },
  stepperGrid: {
    margin: theme.spacing(2),
  },
}));
