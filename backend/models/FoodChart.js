import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const foodChartSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    morningMeal: {
      ingredients: { type: [String], default: [] },
      instructions: { type: String, default: '' },
    },
    eveningMeal: {
      ingredients: { type: [String], default: [] },
      instructions: { type: String, default: '' },
    },
    nightMeal: {
      ingredients: { type: [String], default: [] },
      instructions: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default model('FoodChart', foodChartSchema);
