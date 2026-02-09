// server/src/controllers/medicineController.ts
import { Request, Response } from "express";

// Add Medicine
export const addMedicine = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // TODO: Save this to MongoDB later
    res.status(201).json({
      message: "Medicine added successfully",
      data: { name, description, price, imageUrl },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Medicines
export const getAllMedicines = async (req: Request, res: Response) => {
  try {
    // TODO: Fetch from MongoDB later
    res.json({
      medicines: [
        {
          _id: "1",
          name: "Paracetamol",
          description: "Pain reliever and fever reducer",
          price: 25,
          imageUrl: "/uploads/sample1.jpg",
        },
        {
          _id: "2",
          name: "Amoxicillin",
          description: "Antibiotic for bacterial infections",
          price: 45,
          imageUrl: "/uploads/sample2.jpg",
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
