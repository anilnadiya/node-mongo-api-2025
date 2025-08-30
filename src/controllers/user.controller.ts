import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password"); // don’t return password
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json(user);
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
