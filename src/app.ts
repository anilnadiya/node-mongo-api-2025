import express from "express";
import cors from "cors";
import { userRoutes, authRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
