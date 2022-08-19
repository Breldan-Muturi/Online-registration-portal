import express from "express";
import { getUsers } from "../controllers/user/getAll.js";
import { getUserById } from "../controllers/user/getById.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUserById);

export default router;
