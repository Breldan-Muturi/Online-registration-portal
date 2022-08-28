import asyncHandler from "express-async-handler";
import Course from "../../models/course.js";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, code, description, prerequisites } = await req.body;

  if (!title || !description || !code) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const courseImage = req.file && {
    path: `http://localhost:8000${req.file.path}`,
    name: req.file.filename,
    size: `${(req.file.size / 1000).toFixed(2).toString()} KBs`,
  };

  const course = await Course.create({
    title,
    code,
    description,
    prerequisites,
    courseImage,
  });

  res.status(200).json(course);
});
