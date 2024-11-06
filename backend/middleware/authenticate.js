const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user; // Attach the user to the request
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authenticate;
