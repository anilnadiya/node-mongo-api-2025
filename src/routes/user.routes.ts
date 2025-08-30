import { Router } from "express";
import { getUsers, createUser, getProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Only admins can view all users
router.get("/", authMiddleware, authorizeRoles("admin"), getUsers);

// Any logged-in user can create a new user (not common, but for demo)
router.post("/", authMiddleware, createUser);

// Any logged-in user can view their profile
router.get("/me", authMiddleware, getProfile);

export default router;
