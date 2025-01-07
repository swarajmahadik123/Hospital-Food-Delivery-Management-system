const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MealTask",
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["unresolved", "resolved"],
      default: "unresolved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
