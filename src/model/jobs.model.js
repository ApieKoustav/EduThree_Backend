var mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recruiters",
      required: true,
    },
    universityName: { type: String, trim: true, required: true },
    departmentWebsite: { type: String, trim: true },
    location: { type: String, trim: true, required: true },
    positionType: { type: String, trim: true, required: true },
    projectTitle: { type: String, trim: true, required: true },
    projectDescription: { type: String, trim: true, required: true },
    keyResponsibilities: { type: String, trim: true },
    qualification: { type: String, trim: true, required: true },
    applicationProcess: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { collection: "jobs", timestamps: true }
);
module.exports = mongoose.model("jobs", jobsSchema);
