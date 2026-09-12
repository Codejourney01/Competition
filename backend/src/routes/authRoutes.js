const express = require("express");

const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("../controllers/AuthController");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get current logged-in user
router.get("/me", getCurrentUser);

// Logout
router.post("/logout", logout);

module.exports = router;