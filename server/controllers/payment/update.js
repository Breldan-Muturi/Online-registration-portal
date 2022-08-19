import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error("Payment not found");
  }

  const updatedPayment = await Payment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedPayment);
});
