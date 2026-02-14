import express from "express";
const router = express.Router();

// Controller Imports
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

// Middleware Imports
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// @route   POST /api/category
// @access  Private/Admin
router.route("/").post(authenticate, authorizeAdmin, createCategory);

// @route   GET /api/category/categories
// @access  Public
router.route("/categories").get(listCategory);

// @route   GET, PUT, DELETE /api/category/:id
// @access  Mixed
router
  .route("/:id")
  .get(readCategory) // Public
  .put(authenticate, authorizeAdmin, updateCategory) // Admin Only
  .delete(authenticate, authorizeAdmin, removeCategory); // Admin Only

export default router;