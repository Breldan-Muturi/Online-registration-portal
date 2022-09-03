import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const getPaymentByApplicationId = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ applicationId: req.params.id });
  if (!payments) {
    res.status(400);
    throw new Error("No payment for this application");
  }
  res.status(200).json(payments);
});
