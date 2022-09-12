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

const CourseImage = ({ image, setImage }) => {
  const handleChange = (e) => {
    setImage({
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
      name: e.target.files[0].name,
      size: `${(e.target.files[0].size / 1000).toFixed(2).toString()} KBs`,
    });
  };
  return (
    <Grid xs={12} sm={6}>
      <Card variant="outlined">
        {image.file && (
          <>
            <CardMedia
              component="img"
              alt={image.name}
              height="140"
              image={image.path}
            />
            <CardContent>
              <Typography>
                <>
                  {image.name} <br /> {image.size}
                </>
              </Typography>
            </CardContent>
          </>
        )}
        <CardActions>
          <Button
            component="label"
            size="small"
            color={image.file ? "error" : "primary"}
            startIcon={image.file ? <DeleteIcon /> : <UploadFileIcon />}
          >
            {image.file ? "Replace Course Image" : "Add Course Image"}
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
