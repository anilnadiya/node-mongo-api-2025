// src/controllers/apartment.controller.ts
import { Request, Response } from "express";
import * as svc from "../services/apartment.service";

export const createApartment = async (req: Request, res: Response) => {
  try {
    const { building, block, flatNo, ownerName, status } = req.body;
    if (!building || !flatNo) return res.status(400).json({ message: "building and flatNo required" });

    const apt = await svc.createApartment({ building, block, flatNo, ownerName, status });
    return res.status(201).json(apt);
  } catch (err: any) {
    // duplicate key
    if (err.code === 11000) return res.status(400).json({ message: "Apartment already exists" });
    console.error(err);
    return res.status(500).json({ message: "Could not create apartment" });
  }
};

export const listApartments = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const filter: any = {};
    if (req.query.building) filter.building = req.query.building;
    if (req.query.block) filter.block = req.query.block;
    if (req.query.status) filter.status = req.query.status;

    const rows = await svc.findApartments(filter, page, limit);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not list apartments" });
  }
};

export const getApartment = async (req: Request, res: Response) => {
  try {
    const apt = await svc.getApartmentById(req.params.id);
    if (!apt) return res.status(404).json({ message: "Apartment not found" });
    return res.json(apt);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not fetch apartment" });
  }
};

export const updateApartment = async (req: Request, res: Response) => {
  try {
    const apt = await svc.updateApartmentById(req.params.id, req.body);
    if (!apt) return res.status(404).json({ message: "Apartment not found" });
    return res.json(apt);
  } catch (err: any) {
    if (err.code === 11000) return res.status(400).json({ message: "Duplicate apartment" });
    console.error(err);
    return res.status(500).json({ message: "Could not update apartment" });
  }
};

export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const apt = await svc.deleteApartmentById(req.params.id);
    if (!apt) return res.status(404).json({ message: "Apartment not found" });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not delete apartment" });
  }
};
