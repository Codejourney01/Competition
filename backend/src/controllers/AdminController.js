const User = require("../models/User");
const Mentor = require("../models/Mentor");
const Team = require("../models/Team");
const Project = require("../models/Project");

// ==========================================
// ADMIN DASHBOARD
// ==========================================
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalMentors,
      totalTeams,
      totalProjects,
      pendingReviews,
      completedProjects,
    ] = await Promise.all([
      Student.countDocuments({ isActive: true }),

      Mentor.countDocuments({ isActive: true }),

      Team.countDocuments(),

      Project.countDocuments(),

      Project.countDocuments({
        status: {
          $in: ["submitted", "under-review", "review-1", "review-2"],
        },
      }),

      Project.countDocuments({
        status: "completed",
      }),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        totalStudents,
        totalMentors,
        totalTeams,
        totalProjects,
        pendingReviews,
        completedProjects,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
};
// ==========================================
// GET ALL STUDENTS
// ==========================================
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get students",
      error: error.message,
    });
  }
};
// ==========================================
// GET ALL MENTORS
// ==========================================
const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mentors.length,
      mentors,
    });
  } catch (error) {
    console.error("Get Mentors Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get mentors",
      error: error.message,
    });
  }
};
// ==========================================
// ASSIGN MENTOR
// ==========================================
const assignMentor = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { mentorId } = req.body;

    if (!mentorId) {
      return res.status(400).json({
        success: false,
        message: "Mentor ID is required",
      });
    }

    const mentor = await Mentor.findOne({
      _id: mentorId,
      isActive: true,
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.mentor = mentorId;
    project.mentorAssignedAt = new Date();

    // Once mentor is assigned, move to review
    if (
      project.status === "submitted" ||
      project.status === "under-review"
    ) {
      project.status = "under-review";
    }

    await project.save();

    const updatedProject = await Project.findById(projectId)
      .populate("team")
      .populate(
        "mentor",
        "name email employeeId department designation specialization"
      );

    res.status(200).json({
      success: true,
      message: "Mentor assigned successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Assign Mentor Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to assign mentor",
      error: error.message,
    });
  }
};
// ==========================================
// DEACTIVATE STUDENT
// ==========================================
const deactivateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deactivated successfully",
      student,
    });
  } catch (error) {
    console.error("Deactivate Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate student",
      error: error.message,
    });
  }
};
// ==========================================
// GET ALL PROJECTS
// ==========================================
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate(
        "team",
        "teamName teamCode leader members department semester"
      )
      .populate(
        "mentor",
        "name email employeeId department designation"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get All Projects Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message,
    });
  }
};
// ==========================================
// GET ALL TEAMS
// ==========================================

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate(
        "leader",
        "name email enrollmentNo department semester profileImage"
      )
      .populate(
        "members",
        "name email enrollmentNo department semester profileImage"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.error("Get All Teams Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get teams",
      error: error.message,
    });
  }
};
// ==========================================
// DEACTIVATE MENTOR
// ==========================================

const deactivateMentor = async (req, res) => {
  try {
    const { id } = req.params;

    const mentor = await Mentor.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mentor deactivated successfully",
      mentor,
    });
  } catch (error) {
    console.error("Deactivate Mentor Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate mentor",
      error: error.message,
    });
  }
};


module.exports = {
  getDashboardStats,

  getAllStudents,
  getAllMentors,

  getAllProjects,
  getAllTeams,

  assignMentor,

  deactivateStudent,
  deactivateMentor,
};