import asyncHandler from "express-async-handler";
import Course from "../../models/courseModel.js";

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find(req.course);
  res.status(200).json(courses);
});

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }
  res.status(200).json(course);
});

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

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCourse);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }
  await course.remove();
  res.status(200).json({ id: req.params.id });
});
