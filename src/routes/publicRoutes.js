const express = require("express");
const {
  signUp,
  verifyUsername,
  forgetPassword,
} = require("../controller/publicCtrl");
const { verifyToken } = require("../middlewares/auth");
const route = express.Router();

route.post("/signup", signUp);
route.post("/verifyToken", verifyToken);
route.post("/verifyUsername", verifyUsername);
route.post("/forgetPassword/:id", forgetPassword);
module.exports = route;
