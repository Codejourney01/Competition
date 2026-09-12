const Project = require("../models/Project");
const Team = require("../models/Team");

// ==========================================
// CREATE PROJECT
// ==========================================
const createProject = async (req, res) => {
  try {
    const {
      title,
      domain,
      problemStatement,
      objectives,
      description,
      technologies,
    } = req.body;

    const studentId = req.user._id;

    if (!title || !domain || !problemStatement) {
      return res.status(400).json({
        success: false,
        message: "Title, domain and problem statement are required",
      });
    }

    // Find team of logged-in student
    const team = await Team.findOne({
      members: studentId,
    });

    if (!team) {
      return res.status(400).json({
        success: false,
        message: "You must create or join a team first",
      });
    }

    // Prevent multiple active projects for same team
    const existingProject = await Project.findOne({
      team: team._id,
      status: { $ne: "completed" },
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Your team already has an active project",
      });
    }

    const project = await Project.create({
      title,
      domain,
      problemStatement,
      objectives: objectives || [],
      description: description || "",
      technologies: technologies || [],
      team: team._id,
      mentor: null,
      status: "draft",
      progressPercentage: 0,
      currentMilestone: "Proposal",
    });

    const populatedProject = await Project.findById(project._id)
      .populate("team")
      .populate("mentor");

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: populatedProject,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY PROJECT
// ==========================================
const getMyProject = async (req, res) => {
  try {
    const studentId = req.user._id;

    const team = await Team.findOne({
      members: studentId,
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "You are not part of any team",
      });
    }

    const project = await Project.findOne({
      team: team._id,
    })
      .populate(
        "team",
        "teamName teamCode leader members department semester"
      )
      .populate(
        "mentor",
        "name email employeeId department designation specialization profileImage"
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "No project found for your team",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get My Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get project",
      error: error.message,
    });
  }
};

// ==========================================
// GET PROJECT DETAILS
// ==========================================
const getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate(
        "team",
        "teamName teamCode leader members department semester"
      )
      .populate(
        "mentor",
        "name email employeeId department designation specialization profileImage bio"
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Project Details Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get project details",
      error: error.message,
    });
  }
};

// ==========================================
// SUBMIT PROJECT
// ==========================================
const submitProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).populate("team");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check student belongs to project team
    const isMember = project.team.members.some(
      (member) => String(member) === String(req.user._id)
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this project team",
      });
    }

    project.status = "submitted";
    project.submittedAt = new Date();

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project submitted successfully",
      project,
    });
  } catch (error) {
    console.error("Submit Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit project",
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getMyProject,
  getProjectDetails,
  submitProject,
};