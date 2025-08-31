import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "resident" | "maintenance" | "accountant";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "resident", "maintenance", "accountant"],
      default: "resident",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
