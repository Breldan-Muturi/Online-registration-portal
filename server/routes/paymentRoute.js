import express from "express";
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentControllers/paymentController.js";

const router = express.Router();

router.route("/").get(getPayments).post(createPayment);
router.route("/:id").put(updatePayment).delete(deletePayment);

export default router;
