import asyncHandler from "express-async-handler";
import Course from "../../models/course.js";

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }
  await course.remove();
  res.status(200).json({ id: req.params.id });
});
