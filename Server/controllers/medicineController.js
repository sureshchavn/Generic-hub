const Medicine = require("../models/medicineModel");

exports.getMedicines = async (req, res) => {
  const data = await Medicine.find();
  res.json(data);
};

exports.addMedicine = async (req, res) => {
  const { name, price } = req.body;

  const image = req.file ? req.file.filename : "";

  const med = await Medicine.create({ name, price, image });

  res.json(med);
};