const express = require("express");
const router = express.Router();

const {
  getMedicines,
  addMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine  // ✅ add this
} = require("../controllers/medicineController");

const multer = require("multer");

// file upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage });

// ✅ routes
router.get("/", getMedicines);
router.get("/:id", getMedicineById);
router.post("/", addMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

module.exports = router;