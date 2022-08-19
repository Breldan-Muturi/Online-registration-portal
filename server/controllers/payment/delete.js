import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error("Payment not found");
  }
  await payment.remove();
  res.status(200).json({ id: req.params.id });
});
