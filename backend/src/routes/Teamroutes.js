const express = require("express");

const {
  createTeam,
  getMyTeam,
  getTeamDetails,
  addTeamMember,
  removeTeamMember,
} = require("../controllers/Teamcontrol");

const { protect } = require("../middleware/Authmiddleware");
const { requireRole } = require("../middleware/Rolemiddleware");

const router = express.Router();

// Create team
router.post(
  "/",
  protect,
  requireRole("student"),
  createTeam
);

// Get logged-in student's team
router.get(
  "/my-team",
  protect,
  requireRole("student"),
  getMyTeam
);

// Get team details
router.get(
  "/:id",
  protect,
  getTeamDetails
);

// Add team member
router.post(
  "/:id/members",
  protect,
  requireRole("student"),
  addTeamMember
);

// Remove team member
router.delete(
  "/:id/members/:studentId",
  protect,
  requireRole("student"),
  removeTeamMember
);

module.exports = router;