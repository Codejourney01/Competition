const express = require("express");

const {
  getDashboardStats,
  getAllStudents,
  getAllMentors,
  getAllProjects,
  getAllTeams,
  assignMentor,
  deactivateStudent,
  deactivateMentor,
} = require("../controllers/AdminController");

const { protect } = require("../middleware/Authmiddleware");
const { requireRole } = require("../middleware/Rolemiddleware");

const router = express.Router();

// Admin dashboard
router.get(
  "/dashboard",
  protect,
  requireRole("admin"),
  getDashboardStats
);

// Get all students
router.get(
  "/students",
  protect,
  requireRole("admin"),
  getAllStudents
);

// Get all mentors
router.get(
  "/mentors",
  protect,
  requireRole("admin"),
  getAllMentors
);

// Get all teams
router.get(
  "/teams",
  protect,
  requireRole("admin"),
  getAllTeams
);

// Get all projects
router.get(
  "/projects",
  protect,
  requireRole("admin"),
  getAllProjects
);

// Assign mentor to project
router.patch(
  "/projects/:projectId/mentor",
  protect,
  requireRole("admin"),
  assignMentor
);

// Deactivate student
router.patch(
  "/students/:id/deactivate",
  protect,
  requireRole("admin"),
  deactivateStudent
);

// Deactivate mentor
router.patch(
  "/mentors/:id/deactivate",
  protect,
  requireRole("admin"),
  deactivateMentor
);

module.exports = router;