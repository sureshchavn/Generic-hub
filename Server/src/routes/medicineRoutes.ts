import express from "express";
import { addMedicine, getAllMedicines } from "../controllers/medicineController.js";

const router = express.Router();

router.post("/add", addMedicine);
router.get("/", getAllMedicines);

export default router;
