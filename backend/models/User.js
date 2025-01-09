import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "pantry_staff", "delivery_personnel"],
      required: true,
    },
    notifications: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Explicitly add _id
        message: { type: String, required: true }, // Notification message
        timestamp: { type: Date, default: Date.now }, // Timestamp of the notification
        isRead: { type: Boolean, default: false }, // Flag to track if the notification is read
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
