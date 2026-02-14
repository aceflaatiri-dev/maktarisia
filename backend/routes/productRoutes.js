import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// Controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";

// Middleware
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// --- PUBLIC ROUTES ---
router.get("/", fetchProducts);
router.get("/allproducts", fetchAllProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.post("/filtered-products", filterProducts);

// --- REVIEW ROUTE (Authenticated Users) ---
// Removed checkId
router.post("/:id/reviews", authenticate, addProductReview);

// --- ADMIN ROUTES ---
router.post("/", authenticate, authorizeAdmin, formidable(), addProduct);

router
  .route("/:id")
  .get(fetchProductById) // Removed checkId
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails) // Added formidable just in case you update images
  .delete(authenticate, authorizeAdmin, removeProduct); // Removed checkId

export default router;