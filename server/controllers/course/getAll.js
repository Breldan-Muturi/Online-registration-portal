import asyncHandler from "express-async-handler";
import Course from "../../models/course.js";

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find(req.course);
  res.status(200).json(courses);
});
