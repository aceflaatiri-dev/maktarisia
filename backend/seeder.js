import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import categories from "./data/categories.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import Order from "./models/orderModel.js"; // Added Order to clear it out too

import connectDB from "./config/db.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // 1. Clear everything first to avoid duplicate key errors
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // 2. Insert Categories and Users first (since Products depend on them)
    const createdCategories = await Category.insertMany(categories);
    const createdUsers = await User.insertMany(users);

    // Grab the first user from your data/users.js (assumed to be an admin)
    const adminUser = createdUsers[0]._id;

    // 3. Map products to include the Admin ID and a Random Category ID
    const sampleProducts = products.map((product) => {
      const randomCategory = createdCategories[Math.floor(Math.random() * createdCategories.length)]._id;
      return {
        ...product,
        user: adminUser,
        category: randomCategory,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("🚀 Data Imported Successfully!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}