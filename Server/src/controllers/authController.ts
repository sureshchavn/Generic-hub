// server/src/controllers/medicineController.ts
import { Request, Response } from "express";
import { Medicine } from "../models/medicineModel.js";
import path from "path";

// Add medicine with image
export const addMedicine = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Medicine image is required" });
    }

    const imageUrl = `/uploads/${file.filename}`; // Public folder

    const medicine = await Medicine.create({ name, description, price, imageUrl });

    res.status(201).json({ message: "Medicine added", medicine });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all medicines
export const getAllMedicines = async (_req: Request, res: Response) => {
  try {
    const medicines = await Medicine.find();
    res.json({ medicines });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
