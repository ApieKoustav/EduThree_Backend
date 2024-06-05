const express = require("express");
const { spawn } = require("child_process");
const { exec } = require("child_process");

const checkPythonVersion = () => {
  exec("python -V", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Python version: ${stdout}`);
  });
};


const resumeProcess = async (req, res) => {
  try {
    const pythonProcess = spawn("python", ["D:/ScholMate/src/pythonFiles/nlp3_shashwat.py"]);
    // Call the function to check Python version
checkPythonVersion();
    // Handle data from the Python script
    pythonProcess.stdout.on("data", (data) => {
      console.log(`Data from Python script: ${data}`);
      // You can send this data to the client if needed
    });

    // Handle errors from the Python script
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      // Handle errors, maybe send an error response to the client
    });

    // Handle process exit
    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
      // You can send a response to the client indicating completion
      res.send("Python script processing complete");
    });
  } catch (error) {
    res.status(500).send({ status: false, msg: "Server error" });
  }
};

module.exports = {
  resumeProcess,
};
