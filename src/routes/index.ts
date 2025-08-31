import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import tenantRoutes from "./tenant.routes";
import apartmentRoutes  from "./apartment.routes";
import { Router } from "express";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/appartments", apartmentRoutes);
router.use("/tenants", tenantRoutes);

export default router;
