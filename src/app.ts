import express from "express";
import cors from "cors";
//import { apartmentRoutes, authRoutes, tenantRoutes, userRoutes } from "./routes";
import routes from "./routes"; // 👈 this is routes/index.ts

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

// === API Routes ===
app.use("/api/v1", routes);

// === Health check ===
app.get("/", (req, res) => {
  res.json({ message: "Apartment Management API is running 🚀" });
});



export default app;