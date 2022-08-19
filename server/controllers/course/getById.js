import asyncHandler from "express-async-handler";
import Course from "../../models/course.js";

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }
  res.status(200).json(course);
});
