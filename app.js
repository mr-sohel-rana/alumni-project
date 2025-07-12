 const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

// Import routes
const authRoutes = require("./src/routes/api");

const app = express();

// Logger middleware (optional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware
app.use(cookieParser());

// CORS config - allow your React app origin
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

// Security middlewares
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// JSON parsing middleware
app.use(express.json());

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/mern";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes (must be before React fallback!)
app.use("/api/v1", authRoutes);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
fs.promises
  .mkdir(uploadDir, { recursive: true })
  .then(() => console.log("Uploads directory is ready"))
  .catch((err) => console.error("Error creating uploads directory:", err));

// Serve uploads folder statically
app.use("/uploads", express.static(uploadDir));

// Serve React static files
app.use(express.static(path.join(__dirname, "client", "dist")));

// React SPA fallback (for any route not handled above)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Handle invalid routes (optional, this can be omitted if React handles 404s)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
