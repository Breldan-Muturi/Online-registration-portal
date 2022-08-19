import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const createPayment = asyncHandler(async (req, res) => {
  const { payee, amount, code, method, status, applicationId, attachments } =
    await req.body;

  if (!payee || !amount || !code || !method || !status || !applicationId) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const payment = await Payment.create({
    payee,
    amount,
    code,
    method,
    status,
    applicationId,
    attachments,
  });

  res.status(200).json(payment);
});
