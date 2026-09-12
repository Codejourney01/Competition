const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },

    innovation: {
      type: Number,
      required: true,
      min: 0,
    },

    implementation: {
      type: Number,
      required: true,
      min: 0,
    },

    progress: {
      type: Number,
      required: true,
      min: 0,
    },

    documentation: {
      type: Number,
      required: true,
      min: 0,
    },

    presentation: {
      type: Number,
      required: true,
      min: 0,
    },

    totalScore: {
      type: Number,
      required: true,
      min: 0,
    },

    remarks: {
      type: String,
      default: "",
    },

    evaluatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);