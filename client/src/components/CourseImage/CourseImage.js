import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

const CourseImage = ({ courseImage, setCourseImage }) => {
  const handleChange = (e) => {
    setCourseImage({
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
      name: e.target.files[0].name,
      size: `${(e.target.files[0].size / 1000).toFixed(2).toString()} KBs`,
    });
  };
  return (
    <Grid xs={12} sm={6}>
      <Card variant="outlined">
        {courseImage.file && (
          <>
            <CardMedia
              component="img"
              alt={courseImage.name}
              height="140"
              image={courseImage.path}
            />
            <CardContent>
              <Typography>
                <>
                  {courseImage.name} <br /> {courseImage.size}
                </>
              </Typography>
            </CardContent>
          </>
        )}
        <CardActions>
          <Button
            component="label"
            size="small"
            color={courseImage.file ? "error" : "primary"}
            startIcon={courseImage.file ? <DeleteIcon /> : <UploadFileIcon />}
          >
            {courseImage.file ? "Replace Course Image" : "Add Course Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CourseImage;
