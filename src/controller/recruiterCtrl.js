const Recruiter = require("../model/recuiter.model");
const { isValidId } = require("../util/util");

const getAllRecruiter = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || process.env.Records_Per_Page_Limit;

  try {
    const count = await Recruiter.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;

    const data = await Recruiter.find().skip(skip).limit(limit);
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

const getRecruiterByID = async (req, res) => {
  try {
    const id = req.params.id || req.user?.id; 
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });

    const data = await Recruiter.findById(id);
    res.send({ status: true, data });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

const updateRecruiter = async (req, res) => {
  try {
    const id = req.params.id || req.user?.id; 
    const payload = req.body;
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });
    if (payload.mobile) {
      if (!isValidMobile(payload.mobile)) {
        return res
          .status(400)
          .send({ status: false, msg: "Invalid mobile number" });
      }
    }
    if (payload.email) delete payload.email;
    const data = await Recruiter.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.send({ status: true, data });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};
const isValidMobile = (mobile) => {
  return /^\d+$/.test(mobile);
};
const deleteRecruiter = async (req, res) => {
  try {
    const id = req.params.id || req.user?.id; 
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });

    await Recruiter.findByIdAndDelete(id);
    res.send({ status: true, msg: "Student deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

module.exports = {
  getAllRecruiter,
  getRecruiterByID,
  updateRecruiter,
  deleteRecruiter,
};
