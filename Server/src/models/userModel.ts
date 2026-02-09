import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  role?: string;
}

const userSchema: Schema<IUser> = new Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  age: { type: Number },
  role: { type: String, default: "user" }
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
