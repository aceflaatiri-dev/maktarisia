import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create new category
// @route   POST /api/category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await new Category({ name }).save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// @desc    Update category
// @route   PUT /api/category/:categoryId
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// @desc    Delete category
// @route   DELETE /api/category/:categoryId
const removeCategory = asyncHandler(async (req, res) => {
  try {
    // UPDATED: findByIdAndDelete is the standard for Mongoose 8
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    
    if (!removed) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted successfully", removed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// @desc    List all categories
// @route   GET /api/category/categories
const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({}).sort({ name: 1 }); // Sorted for better UI
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

// @desc    Get specific category
// @route   GET /api/category/:id
const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};