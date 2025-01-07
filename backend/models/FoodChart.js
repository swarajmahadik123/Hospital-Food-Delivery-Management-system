const mongoose = require("mongoose");

const foodChartSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    morningMeal: {
      ingredients: { type: [String], default: [] },
      instructions: { type: String, default: "" },
    },
    eveningMeal: {
      ingredients: { type: [String], default: [] },
      instructions: { type: String, default: "" },
    },
    nightMeal: {
      ingredients: { type: [String], default: [] },
      instructions: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodChart", foodChartSchema);
