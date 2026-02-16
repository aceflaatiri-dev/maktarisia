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
const allowedOrigins = [
  "http://localhost:5173",
  "https://maktarisia.netlify.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// --- ROUTES ---
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// --- STATIC FILES (The Ultimate Fix) ---
const __dirname = path.resolve();

// Logic: If we are already in the 'backend' folder, serve 'uploads'. 
// If we are in the 'root', serve 'backend/uploads'.
const isInsideBackend = __dirname.endsWith("backend");
const uploadsPath = isInsideBackend 
  ? path.join(__dirname, "uploads") 
  : path.join(__dirname, "backend", "uploads");

app.use("/uploads", express.static(uploadsPath));

// Debugging log for Render Console
console.log("-----------------------------------------");
console.log("Server Dir:", __dirname);
console.log("Looking for uploads at:", uploadsPath);
console.log("-----------------------------------------");

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () =>
  console.log(`🚀 Server running on port: ${port}`)
);