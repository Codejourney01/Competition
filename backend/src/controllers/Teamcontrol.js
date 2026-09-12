const Team = require("../models/Team");
const User = require("../models/User");

// ==========================================
// CREATE TEAM
// ==========================================

const createTeam = async (req, res) => {
  try {
    const { teamName, teamCode, department, semester, members } = req.body;

    // Logged-in student
    const studentId = req.user._id;

    if (!teamName || !teamCode || !department || !semester) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required team details",
      });
    }

    // Check duplicate team code
    const existingTeam = await Team.findOne({ teamCode });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team code already exists",
      });
    }

    // Start members with logged-in student as leader
    let teamMembers = [studentId];

    // Add other members if provided
    if (members && Array.isArray(members)) {
      teamMembers = [...new Set([studentId, ...members])];
    }

    // Verify all users exist AND are students
    const students = await User.find({
      _id: { $in: teamMembers },
      role: "student",
      isActive: true,
    });

    if (students.length !== teamMembers.length) {
      return res.status(400).json({
        success: false,
        message: "One or more students do not exist",
      });
    }

    // Create team
    const team = await Team.create({
      teamName,
      teamCode,
      leader: studentId,
      members: teamMembers,
      department,
      semester,
      createdBy: studentId,
      status: "forming",
    });

    // Populate team members
    const populatedTeam = await Team.findById(team._id)
      .populate("leader", "name email role phone profileImage")
      .populate("members", "name email role phone profileImage");

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      team: populatedTeam,
    });
  } catch (error) {
    console.error("Create Team Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create team",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY TEAM
// ==========================================

const getMyTeam = async (req, res) => {
  try {
    const studentId = req.user._id;

    const team = await Team.findOne({
      members: studentId,
    })
      .populate("leader", "name email role phone profileImage")
      .populate("members", "name email role phone profileImage");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "You are not part of any team",
      });
    }

    res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    console.error("Get My Team Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get team",
      error: error.message,
    });
  }
};

// ==========================================
// GET TEAM DETAILS
// ==========================================

const getTeamDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id)
      .populate(
        "leader",
        "name email role phone department semester profileImage"
      )
      .populate(
        "members",
        "name email role phone department semester profileImage"
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
    console.error("Get Team Details Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get team details",
      error: error.message,
    });
  }
};

// ==========================================
// ADD TEAM MEMBER
// ==========================================

const addTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Only leader can add members
    if (String(team.leader) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Only the team leader can add members",
      });
    }

    // Find user and make sure they are a student
    const student = await User.findOne({
      _id: studentId,
      role: "student",
      isActive: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check if already a member
    if (
      team.members.some(
        (member) => String(member) === String(studentId)
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Student is already a team member",
      });
    }

    // Add member
    team.members.push(studentId);

    await team.save();

    // Return updated team
    const updatedTeam = await Team.findById(id)
      .populate("leader", "name email role phone profileImage")
      .populate("members", "name email role phone profileImage");

    res.status(200).json({
      success: true,
      message: "Student added to team",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Add Team Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add team member",
      error: error.message,
    });
  }
};

// ==========================================
// REMOVE TEAM MEMBER
// ==========================================

const removeTeamMember = async (req, res) => {
  try {
    const { id, studentId } = req.params;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Only leader can remove members
    if (String(team.leader) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Only the team leader can remove members",
      });
    }

    // Leader cannot remove themselves
    if (String(team.leader) === String(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Team leader cannot be removed",
      });
    }

    // Check if student is actually in the team
    const isMember = team.members.some(
      (member) => String(member) === String(studentId)
    );

    if (!isMember) {
      return res.status(404).json({
        success: false,
        message: "Student is not a member of this team",
      });
    }

    // Remove member
    team.members = team.members.filter(
      (member) => String(member) !== String(studentId)
    );

    await team.save();

    res.status(200).json({
      success: true,
      message: "Team member removed successfully",
    });
  } catch (error) {
    console.error("Remove Team Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove team member",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  createTeam,
  getMyTeam,
  getTeamDetails,
  addTeamMember,
  removeTeamMember,
};