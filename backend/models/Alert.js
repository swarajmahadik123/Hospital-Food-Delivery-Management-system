import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealTask',
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['unresolved', 'resolved'],
      default: 'unresolved',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Alert', alertSchema);
