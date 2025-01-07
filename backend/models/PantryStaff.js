import mongoose from 'mongoose';

const pantryStaffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('PantryStaff', pantryStaffSchema);
