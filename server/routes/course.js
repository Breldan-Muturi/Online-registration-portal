import express from "express";
import { createCourse } from "../controllers/course/create.js";
import { deleteCourse } from "../controllers/course/delete.js";
import { getCourses } from "../controllers/course/getAll.js";
import { getCourseById } from "../controllers/course/getById.js";
import { updateCourse } from "../controllers/course/update.js";

const router = express.Router();

router.route("/").get(getCourses).post(createCourse);
router
  .route("/:id")
  .get(getCourseById)
  .patch(updateCourse)
  .delete(deleteCourse);

export default router;
