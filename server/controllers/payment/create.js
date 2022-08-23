import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const createPayment = asyncHandler(async (req, res) => {
  const { payee, amount, code, method, applicationId } = await req.body;

  if (!payee || !amount || !code || !method || !applicationId) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  if (req.files) {
    let path = "";
    req.files.array.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
  }

  const attachments = req.files.map((attachment) => ({
    path: attachment.path,
    name: attachment.filename,
    size: `${(attachment.size / 1000).toFixed(2).toString()} KBs`,
  }));

  const payment = await Payment.create({
    payee,
    amount,
    code,
    method,
    applicationId,
    attachments,
  });

  res.status(200).json(payment);
});
