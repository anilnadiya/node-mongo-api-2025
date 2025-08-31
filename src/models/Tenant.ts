import { Schema, model, Document, Types } from "mongoose";

export interface ITenant extends Document {
  apartment: Types.ObjectId; // reference to Apartment._id
  name: string;
  contact: string;
  leaseStart?: Date;
  leaseEnd?: Date;
  rent?: number;
  isOwnerOccupier?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    apartment: { type: Schema.Types.ObjectId, ref: "Apartment", required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    leaseStart: Date,
    leaseEnd: Date,
    rent: Number,
    isOwnerOccupier: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Tenant = model<ITenant>("Tenant", TenantSchema);
//export type { ITenant };
