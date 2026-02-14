import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category name is required"],
      maxLength: 32,
      unique: true,
    },
  },
  { timestamps: true } // Useful for "Sort by Newest" logic
);

const Category = mongoose.model("Category", categorySchema);
export default Category;