const { compare, hash } = require("bcrypt");
const Recruiter = require("../model/recuiter.model");
const Student = require("../model/student.model");
const { isValidId } = require("../util/util");

const changePassword = async (req, res) => {
  try {
    const { id, type } = req.user;
    const { currentPassword, newPassword } = req.body;
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });

    const validTypes = ["student", "recruiter"];
    if (!type) {
      return res
        .status(400)
        .send({ status: false, msg: "User type is required." });
    } else if (!validTypes.includes(type)) {
      return res.status(400).send({ status: false, msg: "Invalid user type." });
    }
    if (type === "student") {
      const student = await Student.findById(id);
      const isPasswordMatch = await compare(currentPassword, student.password);
      if (!student || !isPasswordMatch) {
        return res
          .status(400)
          .send({ status: false, msg: "Invalid current password" });
      }
      const hashedPassword = await hash(newPassword, 10);
      student.password = hashedPassword;
      await student.save();
    } else {
      const recruiter = await Recruiter.findById(id);
      const isPasswordMatch = await compare(
        currentPassword,
        recruiter.password
      );
      if (!recruiter || !isPasswordMatch) {
        return res
          .status(400)
          .send({ status: false, msg: "Invalid current password" });
      }
      const hashedPassword = await hash(newPassword, 10);
      recruiter.password = hashedPassword;
      await recruiter.save();
    }

    res.send({ status: true, msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error", error });
  }
};

module.exports = {
  changePassword,
};
