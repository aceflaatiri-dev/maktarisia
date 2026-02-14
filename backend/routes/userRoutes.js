import express from "express";
const router = express.Router();

// Controller Imports
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

// Middleware Imports
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// --- PUBLIC & BASE USER ROUTES ---
router
  .route("/")
  .post(createUser) // Register
  .get(authenticate, authorizeAdmin, getAllUsers); // Admin: View all users

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

// --- LOGGED-IN USER PROFILE ---
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// --- ADMIN SPECIFIC ROUTES ---
router
  .route("/:id")
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById)
  .delete(authenticate, authorizeAdmin, deleteUserById);

export default router;