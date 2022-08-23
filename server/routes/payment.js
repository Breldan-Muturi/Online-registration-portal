import express from "express";
import { storage } from "../middleware/fileUpload/payment.js";
import { createPayment } from "../controllers/payment/create.js";
import { deletePayment } from "../controllers/payment/delete.js";
import { getPayments } from "../controllers/payment/getAll.js";
import { getPaymentByApplicationId } from "../controllers/payment/getByApplicationId.js";
import { getPaymentById } from "../controllers/payment/getById.js";
import { updatePayment } from "../controllers/payment/update.js";

const router = express.Router();

router
  .route("/")
  .get(getPayments)
  .post(storage.array("attachments"), createPayment);
router
  .route("/:id")
  .get(getPaymentById)
  .patch(storage.array("attachments"), updatePayment)
  .delete(deletePayment);
router.route("/application/:id").get(getPaymentByApplicationId);

export default router;
