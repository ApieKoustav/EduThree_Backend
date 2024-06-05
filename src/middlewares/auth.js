const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../model/student.model");
const Recruiter = require("../model/recuiter.model");

const auth = async (req, res, next) => {
  try {
    const tokenString = req.header("Authorization");

    const bearer = tokenString?.split(" ");
    const token = bearer?.[1];
    if (!tokenString || token === "null") {
      return res.status(401).json({
        message: "Access denied. Authentication token missing.",
      });
    }

    try {
      const verifiedUser = await jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET_KEY
      );
      if (!verifiedUser) {
        throw new Error("Invalid or expired token");
      }
      req.user = verifiedUser;
      next();
    } catch (error) {
      console.log("error", error);
      return res.status(401).json({
        message: "Access denied. Invalid or expired authentication token.",
      });
    }
  } catch (error) {
    console.log("Error in auth middleware:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const generateToken = async (req, res, next) => {
  try {
    const { username, password, type } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    let user;
    if (type === "student") {
      user = await Student.findOne({ email: username });
    } else if (type === "recruiter") {
      user = await Recruiter.findOne({ email: username });
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Check if the provided password matches the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const payload = {
      id: user._id,
      username: user.email,
      type: type,
    };

    const options = {
      expiresIn: "1h", // Token expiration time
      algorithm: "HS256", // HMAC SHA-256 algorithm
    };

    const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET_KEY, options);

    res.json({ token, name: user?.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Access denied. Authentication token missing.",
      });
    }
    try {
      const verifiedUser = await jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET_KEY
      );
      if (!verifiedUser) {
        return res.status(401).json({
          status: false,
          message: "Invalid or expired token",
        });
      }
      res.status(200).json({
        type: verifiedUser?.type || "",
        status: true,
        message: "Token is verified.",
      });
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: "Access denied. Invalid or expired authentication token.",
      });
    }
  } catch (error) {
    console.log("Error in auth middleware:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
module.exports = generateToken;

module.exports = { auth, generateToken, verifyToken };
