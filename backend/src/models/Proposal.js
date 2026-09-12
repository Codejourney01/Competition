const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    problemStatement: {
      type: String,
      default: "",
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

    proposalFile: {
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
      ],
      default: "draft",
    },

    mentorComment: {
      type: String,
      default: "",
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Proposal", proposalSchema);