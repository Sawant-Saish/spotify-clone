const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const { applyTimestamps } = require("./models/user.model");
const musicRoutes = require("./routes/music.route");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

module.exports = app;
