// server/src/routes/medicineRoutes.ts
import express from "express";
// ✅ Add .js at the end for ESM imports
import { addMedicine, getAllMedicines } from "../controllers/medicineController.js";

const router = express.Router();

router.post("/", addMedicine);
router.get("/", getAllMedicines);

export default router;
