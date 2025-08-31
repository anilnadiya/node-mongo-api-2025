import { User, IUser } from "../models";

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};