const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// static upload folder
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);


app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});