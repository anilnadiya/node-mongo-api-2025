// src/services/auth.service.ts
import bcrypt from "bcryptjs";
import { User, IUser } from "../models";

export const findUserByEmail = (email: string): Promise<IUser | null> =>
  User.findOne({ email }).exec();

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: IUser["role"];
}) => {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashed,
    role: data.role || "resident",
  });
  return user;
};

export const validatePassword = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);
