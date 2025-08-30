import dotenv from "dotenv";
dotenv.config();   // must be before connectDB()

import app from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
