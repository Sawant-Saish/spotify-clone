const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "you don't have access" });
    }

    req.user = decoded; // create new property which is used in future

    next();
  } catch (error) {
    console.log(err);
    return res.status(401).json({ message: "unauthorized" });
  }
}

module.exports = { authArtist };
