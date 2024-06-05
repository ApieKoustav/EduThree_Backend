const express = require("express");
const route = express.Router();
const {
  getAllStudent,
  getStudentByID,
  updateStudent,
  deleteStudent,
} = require("../controller/studentCtrl");

const recruiterCtrl = require("../controller/recruiterCtrl");
const jobsCtrl = require("../controller/jobsCtrl");
const { resumeProcess } = require("../controller/resumeProcessCtrl");
const { changePassword } = require("../controller/commonCtrl");

// Api routes for student's
route.get("/students", getAllStudent);
route.get("/students/byToken", getStudentByID);
route.get("/students/:id", getStudentByID);
route.put("/students/:id", updateStudent);
route.delete("/students/:id", deleteStudent);

// Api routes for recruiter's
route.get("/recruiters", recruiterCtrl.getAllRecruiter);
route.get("/recruiters/byToken", recruiterCtrl.getRecruiterByID);
route.get("/recruiters/:id", recruiterCtrl.getRecruiterByID);
route.put("/recruiters/:id", recruiterCtrl.updateRecruiter);
route.delete("/recruiters/:id", recruiterCtrl.deleteRecruiter);

// Api routes for job's
route.get("/jobs", jobsCtrl.getAlljobs);
route.get("/jobs/getAllRecruiterJobs", jobsCtrl.getAllRecruiterJobs);
route.post("/jobs", jobsCtrl.createjobs);
route.get("/jobs/:id", jobsCtrl.getjobsByID);
route.put("/jobs/:id", jobsCtrl.updatejobs);
route.delete("/jobs/:id", jobsCtrl.deletejobs);

route.get("/processResume", resumeProcess);
route.post("/changePassword", changePassword);
module.exports = route;
