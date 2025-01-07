const mongoose = require("mongoose");

const mealTaskSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    foodChartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodChart",
      required: true,
    },
    mealType: {
      type: String,
      enum: ["morning", "evening", "night"],
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PantryStaff",
      required: true,
    },
    preparationStatus: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "out_for_delivery", "delivered"],
      default: "pending",
    },
    deliveryPersonnelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPersonnel",
    },
    deliveryTimestamp: { type: Date },
    deliveryNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MealTask", mealTaskSchema);
