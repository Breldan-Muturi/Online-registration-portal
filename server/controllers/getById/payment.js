import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error("Payment not found");
  }
  res.status(200).json(payment);
});
