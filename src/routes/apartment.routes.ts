// src/routes/apartment.routes.ts
import { Router } from "express";
import * as apartmentCtrl from "../controllers/apartment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router
  .route("/")
  .post(authorizeRoles("admin"), apartmentCtrl.createApartment) // admin only
  .get(apartmentCtrl.listApartments); // all authenticated users

router
  .route("/:id")
  .get(apartmentCtrl.getApartment) // all authenticated users
  .patch(authorizeRoles("admin"), apartmentCtrl.updateApartment) // admin only
  .delete(authorizeRoles("admin"), apartmentCtrl.deleteApartment); // admin only

export default router;