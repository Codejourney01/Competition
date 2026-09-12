const Project = require("../models/Project");
const Team = require("../models/Team");
const ProgressSubmission = require("../models/ProgressSubmission");
const Proposal = require("../models/Proposal");
const Evaluation = require("../models/Evaluation");

// ==========================================
// GET ASSIGNED PROJECTS
// ==========================================
const getAssignedProjects = async (req, res) => {
  try {
    const mentorId = req.user._id;

    const projects = await Project.find({
      mentor: mentorId,
    })
      .populate(
        "team",
        "teamName teamCode leader members department semester"
      )
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get Assigned Projects Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get assigned projects",
      error: error.message,
    });
  }
};

// ==========================================
// GET ASSIGNED PROJECT DETAILS
// ==========================================
const getAssignedProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({
      _id: id,
      mentor: req.user._id,
    })
      .populate(
        "team",
        "teamName teamCode leader members department semester"
      )
      .populate(
        "mentor",
        "name email employeeId department designation specialization"
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or not assigned to you",
      });
    }

    const submissions = await ProgressSubmission.find({
      project: id,
    })
      .populate("submittedBy", "name email enrollmentNo")
      .sort({ createdAt: -1 });

    const proposals = await Proposal.find({
      project: id,
    })
      .populate("submittedBy", "name email enrollmentNo")
      .sort({ createdAt: -1 });

    const evaluations = await Evaluation.find({
      project: id,
      mentor: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      project,
      proposals,
      submissions,
      evaluations,
    });
  } catch (error) {
    console.error("Get Assigned Project Details Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get project details",
      error: error.message,
    });
  }
};

// ==========================================
// GET PROJECT TEAM
// ==========================================
const getProjectTeam = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      mentor: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or not assigned to you",
      });
    }

    const team = await Team.findById(project.team)
      .populate(
        "leader",
        "name email enrollmentNo department semester profileImage"
      )
      .populate(
        "members",
        "name email enrollmentNo department semester profileImage"
      );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    console.error("Get Project Team Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get team",
      error: error.message,
    });
  }
};

// ==========================================
// GET PROJECT SUBMISSIONS
// ==========================================
const getProjectSubmissions = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      mentor: req.user._id,
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this project",
      });
    }

    const submissions = await ProgressSubmission.find({
      project: projectId,
    })
      .populate("submittedBy", "name email enrollmentNo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error("Get Submissions Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get submissions",
      error: error.message,
    });
  }
};

// ==========================================
// ADD COMMENT / REVIEW SUBMISSION
// ==========================================
const reviewSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const {
      mentorComment,
      status,
    } = req.body;

    const submission = await ProgressSubmission.findById(
      submissionId
    ).populate("project");

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    // Make sure this mentor is assigned to project
    if (
      String(submission.project.mentor) !==
      String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this project",
      });
    }

    submission.mentorComment = mentorComment || "";

    if (status) {
      const allowedStatuses = [
        "under-review",
        "approved",
        "revision-required",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid submission status",
        });
      }

      submission.status = status;
    }

    submission.reviewedAt = new Date();

    await submission.save();

    res.status(200).json({
      success: true,
      message: "Submission reviewed successfully",
      submission,
    });
  } catch (error) {
    console.error("Review Submission Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to review submission",
      error: error.message,
    });
  }
};
// ==========================================
// EVALUATE PROJECT
// ==========================================
const evaluateProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      innovation,
      implementation,
      progress,
      documentation,
      presentation,
      remarks,
    } = req.body;

    const project = await Project.findOne({
      _id: projectId,
      mentor: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or not assigned to you",
      });
    }

    const totalScore =
      Number(innovation || 0) +
      Number(implementation || 0) +
      Number(progress || 0) +
      Number(documentation || 0) +
      Number(presentation || 0);

    const evaluation = await Evaluation.create({
      project: projectId,
      mentor: req.user._id,

      innovation,
      implementation,
      progress,
      documentation,
      presentation,

      totalScore,
      remarks,

      evaluatedAt: new Date(),
    });

    // If final evaluation is done
    if (totalScore >= 0) {
      project.status = "final-review";
      await project.save();
    }

    res.status(201).json({
      success: true,
      message: "Project evaluated successfully",
      evaluation,
    });
  } catch (error) {
    console.error("Evaluate Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to evaluate project",
      error: error.message,
    });
  }
};

module.exports = {
  getAssignedProjects,
  getAssignedProjectDetails,
  getProjectTeam,
  getProjectSubmissions,
  reviewSubmission,
  evaluateProject,
};