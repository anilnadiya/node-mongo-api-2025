// src/models/Apartment.ts
import { Schema, model, Document } from "mongoose";

export type ApartmentStatus = "vacant" | "occupied";

export interface IApartment extends Document {
  building: string;
  block?: string;
  flatNo: string;
  status: ApartmentStatus;
  ownerName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApartmentSchema = new Schema<IApartment>(
  {
    building: { type: String, required: true },
    block: { type: String },
    flatNo: { type: String, required: true },
    status: { type: String, enum: ["vacant", "occupied"], default: "vacant" },
    ownerName: { type: String }
  },
  { timestamps: true }
);

// make building+block+flatNo unique so you can't create duplicate flats
ApartmentSchema.index({ building: 1, block: 1, flatNo: 1 }, { unique: true });

export const Apartment = model<IApartment>("Apartment", ApartmentSchema);
//export type { IApartment };
