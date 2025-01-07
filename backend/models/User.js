import mongoose from 'mongoose';

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
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
