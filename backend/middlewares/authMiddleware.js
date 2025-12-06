const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      // ✅ Find the user and attach to req object (excluding password)
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "token failed", error: error.message });
  }
};







//Middleware for Admin access only...
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // ✅ user is admin → allow access
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};



module.exports = {protect, adminOnly};
