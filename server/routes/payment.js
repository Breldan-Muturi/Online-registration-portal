import express from "express";
import { createPayment } from "../controllers/payment/create.js";
import { deletePayment } from "../controllers/payment/delete.js";
import { getPayments } from "../controllers/payment/getAll.js";
import { getPaymentByApplicationId } from "../controllers/payment/getByApplicationId.js";
import { getPaymentById } from "../controllers/payment/getById.js";
import { updatePayment } from "../controllers/payment/update.js";

const router = express.Router();

router.route("/").get(getPayments).post(createPayment);
router
  .route("/:id")
  .get(getPaymentById)
  .patch(updatePayment)
  .delete(deletePayment);
router.route("/application/:id").get(getPaymentByApplicationId);

export default router;
