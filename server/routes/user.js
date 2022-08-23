import express from "express";
import { storage } from "../middleware/fileUpload/avatar.js";
import { getUsers } from "../controllers/user/getAll.js";
import { getUserById } from "../controllers/user/getById.js";
import { updateUser } from "../controllers/user/update.js";

const router = express.Router();

router.route("/").get(getUsers);
router
  .route("/:id")
  .get(getUserById)
  .patch(storage.single("avatar"), updateUser);

export default router;
