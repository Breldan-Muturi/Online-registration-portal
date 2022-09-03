import express from "express";
import { storage } from "../middleware/fileUpload/course.js";
import { createCourse } from "../controllers/create/course.js";
import { deleteCourse } from "../controllers/delete/course.js";
import { getCourses } from "../controllers/getAll/course.js";
import { getCourseById } from "../controllers/getById/course.js";
import { updateCourse } from "../controllers/update/course.js";

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(storage.single("courseImage"), createCourse);
router
  .route("/:id")
  .get(getCourseById)
  .patch(storage.single("courseImage"), updateCourse)
  .delete(deleteCourse);

export default router;
