import asyncHandler from "express-async-handler";
import Payment from "../../models/paymentModel.js";

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find(req.Payment);
  res.status(200).json(payments);
});

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

export const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error("Payment not found");
  }
  await payment.remove();
  res.status(200).json({ id: req.params.id });
});
