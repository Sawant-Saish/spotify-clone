const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registeruser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const isUserAlreadyExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  const hash = await bcrypt.hash(password, 10);

  if (isUserAlreadyExits) {
    res.status(409).json({ message: "user already exits" });
  }

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

module.exports = { registeruser };
