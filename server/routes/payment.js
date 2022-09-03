import express from "express";
import { storage } from "../middleware/fileUpload/payment.js";
import { createPayment } from "../controllers/create/payment.js";
import { deletePayment } from "../controllers/delete/payment.js";
import { getPayments } from "../controllers/getAll/payment.js";
import { getPaymentByApplicationId } from "../controllers/getByApplicationId/payment.js";
import { getPaymentById } from "../controllers/getById/payment.js";
import { updatePayment } from "../controllers/update/payment.js";

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
