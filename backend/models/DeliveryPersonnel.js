import mongoose from 'mongoose';

const deliveryPersonnelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);
