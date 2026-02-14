import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

// Config & Routes
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

// --- MIDDLEWARES ---

// CORS: Allows your Vite frontend to talk to this backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev")); // Logs requests to the console for easier debugging

// --- ROUTES ---
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

// PayPal Configuration Route
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// --- STATIC FILES (Images) ---
const __dirname = path.resolve();
// Use path.join to ensure the path is correctly formatted for Windows/Linux
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () =>
  console.log(`🚀 Server running on port: http://localhost:${port}`)
);