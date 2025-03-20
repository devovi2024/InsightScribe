import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subcategory.routes.js"
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes)



connectDB()
export default app;
