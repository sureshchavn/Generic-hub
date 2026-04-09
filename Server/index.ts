import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./src/config/db.js";
import medicineRoutes from "./src/routes/medicineRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/medicines", medicineRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
