const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");
const User = require("../models/userModel");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put("/make-admin", async (req, res) => {
  try {
    const { email } = req.body;

    await User.updateOne(
      { email },
      { $set: { role: "admin" } }
    );

    res.json({ msg: "User is now admin" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating role" });
  }
});

module.exports = router;