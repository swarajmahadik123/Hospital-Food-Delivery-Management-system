import mongoose from "mongoose";

const { Schema } = mongoose;

const mealTaskSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    mealType: {
      type: String,
      enum: ["morning", "evening", "night"],
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preparationStatus: {
      type: String,
      enum: ["pending", "in_progress", "prepared"],
      default: "pending",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "out_for_delivery", "delivered"],
      default: "pending",
    },
    deliveryPersonnelId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryTimestamp: { type: Date },
    deliveryNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("MealTask", mealTaskSchema);
