const Medicine = require("../models/medicineModel");


// ✅ GET ALL
exports.getMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find();

    // 🔥 normalize _id → id
    const formatted = meds.map((m) => ({
      ...m._doc,
      id: m._id
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching medicines" });
  }
};


// ✅ GET BY ID
exports.getMedicineById = async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);

    if (!med) {
      return res.status(404).json({ msg: "Medicine not found" });
    }

    res.json({
      ...med._doc,
      id: med._id
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching medicine" });
  }
};


// ✅ ADD MEDICINE
exports.addMedicine = async (req, res) => {
  try {
    const {
      name,
      genericName,
      manufacturer,
      price,
      stock,
      description,
      category,
      disease,
      discount,
      imageUrl
    } = req.body;

    // ✅ safe final price
    const finalPrice =
      discount && discount > 0
        ? price - (price * discount) / 100
        : price;

    const med = await Medicine.create({
      name,
      genericName,
      manufacturer,
      price,
      stock,
      description,
      category,
      disease,
      discount,
      finalPrice,
      imageUrl: imageUrl || ""
    });

    res.json({
      ...med._doc,
      id: med._id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding medicine" });
  }
};


// ✅ UPDATE MEDICINE
exports.updateMedicine = async (req, res) => {
  try {
    const {
      price,
      discount
    } = req.body;

    // 🔥 recalc price
    let finalPrice = price;
    if (discount && discount > 0) {
      finalPrice = price - (price * discount) / 100;
    }

    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        finalPrice
      },
      { new: true }
    );

    res.json({
      ...updated._doc,
      id: updated._id
    });
  } catch (err) {
    res.status(500).json({ msg: "Error updating medicine" });
  }
};


// ✅ DELETE MEDICINE
exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting medicine" });
  }
};