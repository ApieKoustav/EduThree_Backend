const express = require("express");
const bodyParser = require("body-parser");
const authObj = require("./src/middlewares/auth");
const cors = require("cors");
require("dotenv").config();
const app = express();
const privateRoutes = require("./src/routes/privateRoutes");
const publicRoutes =require("./src/routes/publicRoutes");

const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options("*", cors());
app.use(cors());
require("./src/database/connection");

//for route
app.get("/", (req, res) => {
  res.send("Hi, Welcome to Server.");
});
app.use("/api/login", authObj.generateToken);
app.use("/api",publicRoutes );
app.use("/api", authObj.auth,privateRoutes);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
