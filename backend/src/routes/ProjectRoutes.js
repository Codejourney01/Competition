const express = require("express");

const {
  createProject,
  getMyProject,
  getProjectDetails,
  submitProject,
} = require("../controllers/ProjectController");

const { protect } = require("../middleware/Authmiddleware");
const { requireRole } = require("../middleware/Rolemiddleware");

const router = express.Router();

// Create project
router.post(
  "/",
  protect,
  requireRole("student"),
  createProject
);

// Get logged-in student's project
router.get(
  "/my-project",
  protect,
  requireRole("student"),
  getMyProject
);

// Get project details
router.get(
  "/:id",
  protect,
  getProjectDetails
);

// Submit project
router.patch(
  "/:id/submit",
  protect,
  requireRole("student"),
  submitProject
);

module.exports = router;