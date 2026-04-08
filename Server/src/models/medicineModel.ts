import mongoose, { Schema, Document } from "mongoose";

export interface IMedicine extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const medicineSchema = new Schema<IMedicine>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

export const Medicine = mongoose.model<IMedicine>("Medicine", medicineSchema);
