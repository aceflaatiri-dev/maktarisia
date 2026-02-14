import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the user to the request object (excluding the password)
      req.user = await User.findById(decoded.userId).select("-password");
      
      if (!req.user) {
        res.status(401);
        throw new Error("User not found in registry.");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

// Check if the user has Admin clearance
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403); // 403 Forbidden is more accurate for "Logged in but not allowed"
    throw new Error("Access denied. Admin authorization required.");
  }
};

export { authenticate, authorizeAdmin };