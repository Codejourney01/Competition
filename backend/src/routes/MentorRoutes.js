const express = require("express");

const {
  getAssignedProjects,
  getAssignedProjectDetails,
  getProjectTeam,
  getProjectSubmissions,
  reviewSubmission,
  evaluateProject,
} = require("../controllers/MentorController");

const { protect } = require("../middleware/Authmiddleware");
const { requireRole } = require("../middleware/Rolemiddleware");

const router = express.Router();

// Get projects assigned to logged-in mentor
router.get(
  "/projects",
  protect,
  requireRole("mentor"),
  getAssignedProjects
);

// Get assigned project details
router.get(
  "/projects/:id",
  protect,
  requireRole("mentor"),
  getAssignedProjectDetails
);

// Get project team
router.get(
  "/projects/:projectId/team",
  protect,
  requireRole("mentor"),
  getProjectTeam
);

// Get project submissions
router.get(
  "/projects/:projectId/submissions",
  protect,
  requireRole("mentor"),
  getProjectSubmissions
);

// Review a submission
router.patch(
  "/submissions/:submissionId/review",
  protect,
  requireRole("mentor"),
  reviewSubmission
);

// Evaluate project
router.post(
  "/projects/:projectId/evaluation",
  protect,
  requireRole("mentor"),
  evaluateProject
);

module.exports = router;