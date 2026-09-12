const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    domain: {
      type: String,
      required: true,
      trim: true,
    },

    problemStatement: {
      type: String,
      required: true,
    },

    objectives: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    technologies: {
      type: [String],
      default: [],
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },

    mentorAssignedAt: {
      type: Date,
      default: null,
    },

    proposalFile: {
      type: String,
      default: "",
    },

    githubUrl: {
      type: String,
      default: "",
    },

    demoUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "under-review",
        "approved",
        "revision-required",
        "review-1",
        "review-2",
        "final-review",
        "completed",
      ],
      default: "draft",
    },

    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    currentMilestone: {
      type: String,
      default: "Proposal",
    },

    finalSubmission: {
      type: String,
      default: "",
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);