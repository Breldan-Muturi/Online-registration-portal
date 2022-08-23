import asyncHandler from "express-async-handler";
import Payment from "../../models/payment.js";

export const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(400);
    throw new Error("Payment not found");
  }
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
  }

  const attachments = req.files.map((attachment) => ({
    path: attachment.path,
    name: attachment.filename,
    size: `${(attachment.size / 1000).toFixed(2).toString()} KBs`,
  }));

  const updatedPayment = await Payment.findByIdAndUpdate(
    req.params.id,
    { ...req.body, attachments },
    { new: true }
  );
  res.status(200).json(updatedPayment);
});
