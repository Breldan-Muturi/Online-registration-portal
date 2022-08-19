import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find(req.Payment);
  res.status(200).json(payments);
});
