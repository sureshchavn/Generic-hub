const Medicine = require("../models/medicineModel");

// ================= GET ALL =================
exports.getMedicines = async (req, res) => {
  try {
    const med = await Medicine.find();

    const formatted = med.map((m) => ({
      ...m._doc,
      id: m._id,
      imageUrl: m.imageUrl
        ? `${req.protocol}://${req.get("host")}${m.imageUrl}`
        : ""
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching medicines" });
  }
};

// ================= GET BY ID =================
exports.getMedicineById = async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);

    if (!med) {
      return res.status(404).json({ msg: "Medicine not found" });
    }

    res.json({
      ...med._doc,
      id: med._id,
      imageUrl: med.imageUrl
        ? `${req.protocol}://${req.get("host")}${med.imageUrl}`
        : ""
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching medicine" });
  }
};

// ================= ADD =================
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

    // 🔥 HANDLE IMAGE (multer OR JSON)
    let finalImage = "";

    if (req.file) {
      finalImage = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      finalImage = imageUrl;
    }

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
      imageUrl: finalImage
    });

    res.json({
      ...med._doc,
      id: med._id,
      imageUrl: finalImage
        ? `${req.protocol}://${req.get("host")}${finalImage}`
        : ""
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding medicine" });
  }
};

// ================= UPDATE =================
exports.updateMedicine = async (req, res) => {
  try {
    const { price, discount } = req.body;

    let finalPrice = price;
    if (discount && discount > 0) {
      finalPrice = price - (price * discount) / 100;
    }

    let updateData = {
      ...req.body,
      finalPrice
    };

    // 🔥 IMAGE UPDATE SUPPORT
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      ...updated._doc,
      id: updated._id,
      imageUrl: updated.imageUrl
        ? `${req.protocol}://${req.get("host")}${updated.imageUrl}`
        : ""
    });
  } catch (err) {
    res.status(500).json({ msg: "Error updating medicine" });
  }
};

// ================= DELETE =================
exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting medicine" });
  }
};