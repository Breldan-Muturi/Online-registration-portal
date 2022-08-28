import asyncHandler from "express-async-handler";
import formidable from "formidable";
import Payment from "../../models/payment.js";

export const createPayment = asyncHandler(async (req, res) => {
  const { payee, amount, code, method, applicationId } = await req.body;

  if (!payee || !amount || !code || !method || !applicationId) {
    res.status(400);
    throw new Error("Please add all required fields");
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

// export const createPayment = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({ error: "Files could not upload" });
//     }
//     console.table({ err, fields, files });
//     const { payee, amount, code, method, applicationId } = fields;
//     const { attachments } = files;

//     let payment = new Payment({ payee, amount, code, method, applicationId });
//   });
// };
