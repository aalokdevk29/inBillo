const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FinancialOperationSchema = new Schema(
  {
    creditAmount: { type: Number },
    debitAmount: { type: Number },
    creditDate: { type: Date },
    debitDate: { type: Date },
    sender: { type: String },
    receiver: { type: String },
  },
  { timestamps: true }
);

FinancialOperationSchema = mongoose.model(
  "FinancialOperation",
  FinancialOperationSchema
);

let userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
    totalBalance: { type: Number, default: 40000 },
    account: {
      ref: "FinancialOperation",
      type: Array,
    },
  },
  { timestamps: true }
);

userSchema = mongoose.model("User", userSchema);

module.exports = {
  userSchema: userSchema,
};
