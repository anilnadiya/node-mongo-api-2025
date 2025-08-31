// src/services/apartment.service.ts
import { Apartment, IApartment } from "../models/Apartment";
import { FilterQuery } from "mongoose";

export const createApartment = (payload: {
  building: string;
  block?: string;
  flatNo: string;
  ownerName?: string;
  status?: IApartment["status"];
}) => {
  return Apartment.create(payload); // returns a Promise<IApartment>
};

export const findApartments = (
  filter: FilterQuery<IApartment> = {},
  page = 1,
  limit = 20
) => {
  const skip = (page - 1) * limit;
  return Apartment.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).exec();
};

export const getApartmentById = (id: string) => Apartment.findById(id).exec();

export const updateApartmentById = (id: string, update: Partial<IApartment>) =>
  Apartment.findByIdAndUpdate(id, update, { new: true }).exec();

export const deleteApartmentById = (id: string) => Apartment.findByIdAndDelete(id).exec();