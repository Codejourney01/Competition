const mongoose = require("mongoose");

const progressSubmissionSchema = new mongoose.Schema(
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

    description: {
      type: String,
      default: "",
    },

    submissionFile: {
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

    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "under-review",
        "approved",
        "revision-required",
      ],
      default: "submitted",
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

module.exports = mongoose.model(
  "ProgressSubmission",
  progressSubmissionSchema
);