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
const upload = require("./src/multer/multer");

// Import routes
const authRoutes = require("./src/routes/api");

const app = express();

// Middleware
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your React app
    credentials: true, // Allow cookies and authentication headers
  })
);

// Add security headers with Helmet
app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // Allow embedding resources from the same origin
    contentSecurityPolicy: false, // Disable CSP for local development (enable for production)
  })
);

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent cross-site scripting (XSS) attacks
app.use(xss());

// Prevent HTTP parameter pollution
app.use(hpp());

// Parse incoming JSON requests
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000, // Limit each IP to 3000 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/mern";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// API Routes
app.use("/api/v1", authRoutes);

// Ensure the uploads directory exists (async check)
const uploadDir = path.join(__dirname, "uploads");
fs.promises
  .mkdir(uploadDir, { recursive: true })
  .then(() => console.log("Uploads directory is ready"))
  .catch((err) => console.error("Error creating uploads directory:", err));

// Image upload route using multer middleware
app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));

// Serve React app (static assets)
app.use(express.static(path.join(__dirname, "client", "dist")));


app.delete('/api/v1/delete-image/:filename', async (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(uploadDir, fileName);

  try {
    // Check if file exists
    await fs.promises.access(filePath, fs.constants.F_OK);

    // Delete the file
    await fs.promises.unlink(filePath);

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    if (err.code === 'ENOENT') {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(500).json({ message: 'Error deleting file', error: err });
  }
});

// Serve React app for all routes (fallback for SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Handle invalid routes
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;