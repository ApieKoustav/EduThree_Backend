const Jobs = require("../model/jobs.model");
const { isValidId } = require("../util/util");

//post api
const createjobs = async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.user;
    payload.recruiterId = id;
    await Jobs.create(payload);
    res.send({ status: true, msg: "Jobs created successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

// To get all Jobs list.
const getAlljobs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || process.env.Records_Per_Page_Limit;

  try {
    const count = await Jobs.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;

    const data = await Jobs.find().skip(skip).limit(limit);
    res.send({
      status: true,
      data,
      totalPages,
      currentPage: page,
      totalItems: count,
      limit,
    });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

// To get all Recruiter Jobs list.
const getAllRecruiterJobs = async (req, res) => {
  const { id } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || process.env.Records_Per_Page_Limit;
  try {
    const count = await Jobs.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;
    const data = await Jobs.find({ recruiterId: id}).skip(skip).limit(limit);
    res.send({
      status: true,
      data,
      totalPages,
      currentPage: page,
      totalItems: count,
      limit,
    });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

//get api
const getjobsByID = async (req, res) => {
  try {
    if (isValidId(req.params.id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });

    const data = await Jobs.findById(req.params.id);
    res.send({ status: true, data });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};
const updatejobs = async (req, res) => {
  try {
    const payload = req.body;
    if (isValidId(req.params.id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });

    const data = await Jobs.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });
    res.send({ status: true, data });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};
//delete api
const deletejobs = async (req, res) => {
  try {
    if (isValidId(req.params.id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });

    await Jobs.findByIdAndDelete(req.params.id);
    res.send({ status: true, msg: "Jobs deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

module.exports = {
  getAlljobs,
  getAllRecruiterJobs,
  createjobs,
  getjobsByID,
  updatejobs,
  deletejobs,
};
