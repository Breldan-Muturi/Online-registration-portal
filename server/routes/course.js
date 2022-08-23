import express from "express";
import { storage } from "../middleware/fileUpload/course.js";
import { createCourse } from "../controllers/course/create.js";
import { deleteCourse } from "../controllers/course/delete.js";
import { getCourses } from "../controllers/course/getAll.js";
import { getCourseById } from "../controllers/course/getById.js";
import { updateCourse } from "../controllers/course/update.js";

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
