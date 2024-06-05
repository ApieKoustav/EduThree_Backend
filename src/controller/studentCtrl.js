const Student = require("../model/student.model");
const { isValidId } = require("../util/util");

// To get all students list.
const getAllStudent = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || process.env.Records_Per_Page_Limit;

  try {
    const count = await Student.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;

    const data = await Student.find().skip(skip).limit(limit);
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
const getStudentByID = async (req, res) => {
  try {
    const id = req.params.id || req.user?.id;
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });
    const data = await Student.findById(id);
    res.send({ status: true, data });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};
const updateStudent = async (req, res) => {
  try {
    const id = req.params.id || req.user?.id;
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });
    const payload = req.body;
    if (payload.email) delete payload.email;
    const data = await Student.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.send({ status: true, data });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};
//delete api
const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id || req.user?.id;
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });

    await Student.findByIdAndDelete(id);
    res.send({ status: true, msg: "Student deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

module.exports = {
  getAllStudent,
  getStudentByID,
  updateStudent,
  deleteStudent,
};
