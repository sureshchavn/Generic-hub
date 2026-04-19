const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
 name: String,
  genericName: String,
  manufacturer: String,
  price: Number,
  stock: Number,
  description: String,
  category: String,
  disease: String,
  discount: Number,
  finalPrice: Number,
  imageUrl: String
});

module.exports = mongoose.model("Medicine", medicineSchema);