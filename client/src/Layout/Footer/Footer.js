import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import useStyles from "./styles";
import FooterBar from "../../Custom/FooterBar";

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <FooterBar variant="dense">
        <Grid container justifyContent="space-between">
          <Typography>
            Copyright © 2022 The Kenya Institute of Public Policy Research and
            Analysis
          </Typography>
          <Typography>
            Developed by Sohn and Sol Technologies Limited
          </Typography>
        </Grid>
      </FooterBar>
    </footer>
  );
};

export default Footer;
