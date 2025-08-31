// src/services/tenant.service.ts
import { Tenant, ITenant } from "../models/Tenant";
import { Apartment } from "../models/Apartment";
import { FilterQuery } from "mongoose";

/**
 * Create tenant and mark apartment as occupied
 */
export const createTenant = async (payload: {
  apartment: string;
  name: string;
  contact: string;
  leaseStart?: Date;
  leaseEnd?: Date;
  rent?: number;
  isOwnerOccupier?: boolean;
}): Promise<ITenant> => {
  const tenant = await Tenant.create(payload);

  // mark apartment occupied (id is a string here)
  await Apartment.findByIdAndUpdate(payload.apartment, { status: "occupied" }).exec();

  return tenant;
};

/**
 * List tenants (with apartment populated)
 */
export const findTenants = (
  filter: FilterQuery<ITenant> = {},
  page = 1,
  limit = 20
) => {
  const skip = (page - 1) * limit;
  return Tenant.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("apartment")
    .exec();
};

export const getTenantById = (id: string) =>
  Tenant.findById(id).populate("apartment").exec();

/**
 * Update tenant.
 * If apartment is changed, mark new apartment occupied and possibly mark previous apartment vacant (if no other tenants).
 */
export const updateTenantById = async (
  id: string,
  update: Partial<ITenant> | Record<string, any>
) => {
  // load existing tenant first
  const existing = await Tenant.findById(id).exec();
  if (!existing) return null;

  const prevApartmentId = existing.apartment ? existing.apartment.toString() : null;
  // perform update
  const updated = await Tenant.findByIdAndUpdate(id, update, { new: true })
    .populate("apartment")
    .exec();

  // if apartment changed, update statuses
  if (update && Object.prototype.hasOwnProperty.call(update, "apartment")) {
    const newApartmentId = update.apartment ? update.apartment.toString() : null;
    if (newApartmentId && newApartmentId !== prevApartmentId) {
      // mark new apartment occupied
      await Apartment.findByIdAndUpdate(newApartmentId, { status: "occupied" }).exec();

      // check if previous apartment still has tenants
      if (prevApartmentId) {
        const remaining = await Tenant.countDocuments({ apartment: prevApartmentId }).exec();
        if (remaining === 0) {
          await Apartment.findByIdAndUpdate(prevApartmentId, { status: "vacant" }).exec();
        }
      }
    }
  }

  return updated;
};

/**
 * Delete tenant. If it was the last tenant for the apartment, mark apartment as vacant.
 */
export const deleteTenantById = async (id: string) => {
  const tenant = await Tenant.findByIdAndDelete(id).exec();
  if (tenant) {
    const apartmentId = tenant.apartment;
    // Count remaining tenants for that apartment
    const count = await Tenant.countDocuments({ apartment: apartmentId }).exec();
    if (count === 0) {
      await Apartment.findByIdAndUpdate(apartmentId, { status: "vacant" }).exec();
    }
  }
  return tenant;
};
