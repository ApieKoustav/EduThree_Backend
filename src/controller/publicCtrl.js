const Student = require("../model/student.model");
const Recruiter = require("../model/recuiter.model");
const { hash } = require("bcrypt");
const validTypes = ["student", "recruiter"];
const { isValidId } = require("../util/util");
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const signUp = async (req, res) => {
  try {
    const payload = req.body;
    let error;

    if (!payload.type) error = "Signup type is required.";
    else if (!validTypes.includes(payload.type)) error = "Invalid signup type.";
    else if (!payload.name) error = "Name is required.";
    else if (!payload.email) error = "Email id is required.";
    else if (!isValidEmail(payload.email))
      error = "Please enter a valid email.";
    else if (!payload.password) error = "Password is required.";
    else if (!payload.confirmPassword) error = "Confirm Password is required.";
    else if (payload.password !== payload.confirmPassword)
      error = "Passwords do not match.";

    if (error) return res.status(400).send({ status: false, msg: error });

    const hashedPassword = await hash(payload.password, 10);
    payload.password = hashedPassword;
    if (payload.type === "student") {
      await Student.create(payload);
    } else {
      await Recruiter.create(payload);
    }

    res.send({ status: true, msg: "User created successfully" });
  } catch (error) {
    res.status(500).send({ status: false, msg: "Server error" });
  }
};

const verifyUsername = async (req, res) => {
  try {
    const payload = req.body;
    let error;

    if (!payload.type) error = "User type is required.";
    else if (!validTypes.includes(payload.type)) error = "Invalid User type.";
    else if (!payload.email) error = "Email id or Username is required.";
    else if (!isValidEmail(payload.email))
      error = "Please enter a valid email.";

    if (error) return res.status(400).send({ status: false, msg: error });
    let user = null;
    if (payload.type === "student") {
      user = await Student.findOne({ email: payload.email });
    } else {
      user = await Recruiter.findOne({ email: payload.email });
    }
    if (user)
      res.send({
        status: true,
        id: user?._id || null,
        msg: "Email id or Username is verified.",
      });
    else
      res.send({
        status: false,
        msg: "Invalid username.",
      });
  } catch (error) {
    res.status(500).send({ status: false, msg: "Server error" });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    if (isValidId(id) == false)
      return res.status(400).send({ status: false, msg: "Invalid user id" });
    const payload = req.body;
    let error;
    if (!payload.type) error = "User type is required.";
    else if (!validTypes.includes(payload.type)) error = "Invalid User type.";
    else if (!payload.password) error = "Password is required.";
    else if (!payload.confirmPassword) error = "Confirm Password is required.";
    else if (payload.password !== payload.confirmPassword)
      error = "Passwords do not match.";
    if (error) return res.status(400).send({ status: false, msg: error });
    const hashedPassword = await hash(payload.password, 10);
    payload.password = hashedPassword;
    if (payload.type === "student") {
      await Student.findByIdAndUpdate(id, payload);
    } else {
      await Recruiter.findByIdAndUpdate(id, payload);
    }
    res.send({ status: true, msg: "Password updated Successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: "server error" });
  }
};
module.exports = {
  signUp,
  verifyUsername,
  forgetPassword,
};
