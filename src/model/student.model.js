var mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String,required:true ,trim:true},
    email: { type: String,required:true,trim:true },
    password: { type: String, required: true },
    objective: { type: String,trim:true },
    education: { type: String,trim:true },
    workExperience: { type: String,trim:true },
    skills: { type: Array },
    certifications: { type: Array },
    language: { type: Array },
    interests: { type: String,trim:true },
    location: { type: String,trim:true },
    isActive: { type: Boolean, default: true }
  },
  { collection: "students", timestamps: true }
);
module.exports = mongoose.model("students", studentSchema);
