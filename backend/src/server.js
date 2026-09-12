const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sessionConfig = require("./config/session");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/Teamroutes");
const projectRoutes = require("./routes/ProjectRoutes");
const mentorRoutes = require("./routes/MentorRoutes");
const adminRoutes = require("./routes/AdminRoutes");

// ==========================================
// APP
// ==========================================

const app = express();

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// SESSION
// ==========================================

app.use(sessionConfig);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Project Monitoring & Mentoring System API is running",
  });
});

// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// TEAM ROUTES
// ==========================================

app.use("/api/teams", teamRoutes);

// ==========================================
// PROJECT ROUTES
// ==========================================

app.use("/api/projects", projectRoutes);

// ==========================================
// MENTOR ROUTES
// ==========================================

app.use("/api/mentors", mentorRoutes);

// ==========================================
// ADMIN ROUTES
// ==========================================

app.use("/api/admin", adminRoutes);

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

// ==========================================
// PORT & DATABASE
// ==========================================

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing from .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });