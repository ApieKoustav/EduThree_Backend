const mongoose = require("mongoose");
const databaseUrl = process.env.DB_URL;
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connection successfully");
  })
  .catch((error) => {
    console.log("Error in database connection", error);
  });
