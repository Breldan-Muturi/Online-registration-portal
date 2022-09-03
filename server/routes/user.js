import express from "express";
import { storage } from "../middleware/fileUpload/avatar.js";
import { getUsers } from "../controllers/getAll/user.js";
import { getUserById } from "../controllers/getById/user.js";
import { updateUser } from "../controllers/update/user.js";

const router = express.Router();

router.route("/").get(getUsers);
router
  .route("/:id")
  .get(getUserById)
  .patch(storage.single("avatar"), updateUser);

export default router;
