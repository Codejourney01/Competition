const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    teamCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    department: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["forming", "active", "completed"],
      default: "forming",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);