const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTER
const registerUser = async (req, res) => {
  const { name, username, email, phone, age, password, role } = req.body;

  try {
    // check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      username,
      email,
      phone,
      age,
      password: hash,
      role: role || "customer"   // ✅ FIXED
    });

    res.json({
      msg: "Registered Successfully",
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Register Error" });
  }
};

// 🔐 LOGIN
const loginUser = async (req, res) => {
  const { usernameOrEmail, email, username, password } = req.body;

  try {
    // 🔥 flexible login (email OR username OR usernameOrEmail)
    const user = await User.findOne({
      $or: [
        { email: usernameOrEmail },
        { username: usernameOrEmail },
        { email: email },
        { username: username }
      ]
    });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Login Error" });
  }
};

module.exports = { registerUser, loginUser };