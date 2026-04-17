const express = require("express");
const router = express.Router();
const {
  getMedicines,
  addMedicine,
} = require("../controllers/medicineController");

const multer = require("multer");

// file upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage });

router.get("/", getMedicines);
router.post("/", upload.single("image"), addMedicine);

module.exports = router;