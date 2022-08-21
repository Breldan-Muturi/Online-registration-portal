import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    payee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Please add a payee"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a payment amount"],
    },
    code: {
      type: String,
      required: [true, "Please add a payment code"],
    },
    method: {
      type: String,
      required: [true, "Please add a payment method"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    applicationId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Application",
      required: [true, "Please add an application for this payment"],
    },
    approvedBy: String,
    approvalMessage: String,
    attachments: { type: [String] },
    receiptNo: String,
    receiptDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
