import asyncHandler from "express-async-handler";
import Course from "../../models/course.js";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, code, description, prerequisites, courseImage } =
    await req.body;

  if (!title || !description || !code) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  // const prerequisitesArray = prerequisites.split(",");

  const course = await Course.create({
    title,
    code,
    description,
    prerequisites,
    courseImage,
  });

  res.status(200).json(course);
});
