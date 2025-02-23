const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const jwtSecret = process.env.JWT_SECRET || "default-secret-key";

const requireSignIn = async (req, res, next) => {
  try {
    let token = req.cookies.auth_token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.user_id);
    if (!user || user.role !== 1) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.error("Error verifying admin role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { requireSignIn, isAdmin };
