const mongoose = require("mongoose");

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const convertToCamelCase = (inputString) => {
  return inputString.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
};

module.exports = {
  convertToCamelCase,
  isValidId,
};
