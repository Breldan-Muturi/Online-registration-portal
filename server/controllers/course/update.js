import asyncHandler from "express-async-handler";
import Course from "../../models/course.js";

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  const courseImage = req.file && {
    path: req.file.path,
    name: req.file.filename,
    size: `${(req.file.size / 1000).toFixed(2).toString()} KBs`,
  };

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    { ...req.body, courseImage },
    { new: true }
  );
  res.status(200).json(updatedCourse);
});
