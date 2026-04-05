const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "remote",
    },
    duration: { type: String, required: true },
    stipend: { type: String, default: "Unpaid" },
    requiredSkills: [{ type: String }],
    field: { type: String, required: true },
    openings: { type: Number, default: 1 },
    deadline: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Internship", internshipSchema);
