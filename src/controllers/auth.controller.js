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

async function loginUser(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({ message: "Invaild credentials" });
  }

  const isPasswordvaild = await bcrypt.compare(password, user.password);

  if (!isPasswordvaild) {
    return res.status(401).json({ message: "Invaild credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearcookie("token");
  res.status(200).json({ message: "User logged out successfully" });
}
module.exports = { registeruser, loginUser, logoutUser };
