import mongoose from 'mongoose';

const pantryDetailsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contactInfo: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("PantryStaff", pantryDetailsSchema);
