// src/controllers/tenant.controller.ts
import { Request, Response } from "express";
import * as tenantService from "../services/tenant.service";
import { Apartment } from "../models/Apartment";

/**
 * Create Tenant
 */
export const createTenant = async (req: Request, res: Response) => {
  try {
    const { apartment, name, contact, leaseStart, leaseEnd, rent, isOwnerOccupier } = req.body;

    // ✅ Validate apartment ID exists
    const apt = await Apartment.findById(apartment);
    if (!apt) {
      return res.status(400).json({ message: "Invalid apartment ID" });
    }

    const tenant = await tenantService.createTenant({
      apartment,
      name,
      contact,
      leaseStart,
      leaseEnd,
      rent,
      isOwnerOccupier,
    });

    res.status(201).json(tenant);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * Get all tenants (with pagination)
 */
export const getTenants = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const tenants = await tenantService.findTenants({}, page, limit);

    res.json(tenants);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * Get tenant by ID
 */
export const getTenantById = async (req: Request, res: Response) => {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json(tenant);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * Update tenant
 */
export const updateTenant = async (req: Request, res: Response) => {
  try {
    const tenant = await tenantService.updateTenantById(req.params.id, req.body);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json(tenant);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * Delete tenant
 */
export const deleteTenant = async (req: Request, res: Response) => {
  try {
    const tenant = await tenantService.deleteTenantById(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json({ message: "Tenant deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
