// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as authSvc from "../services/auth.service";
import { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = "1h";

const sanitizeUser = (user: IUser) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body as {
      name: string;
      email: string;
      password: string;
      role?: IUser["role"];
    };

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const exists = await authSvc.findUserByEmail(email);
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await authSvc.createUser({ name, email, password, role });
    return res.status(201).json({ message: "Registered", user: sanitizeUser(user) });
  } catch (err: any) {
    // duplicate key (race) handling
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.error(err);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await authSvc.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await authSvc.validatePassword(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed" });
  }
};
