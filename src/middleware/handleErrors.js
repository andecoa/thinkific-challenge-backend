// this is our global error handler

const logger = require("../utils/logger");

const handleErrors = (err, req, res, next) => {
  const errorJSON = {
    status: "error",
    message: "internal server error",
  };
  // handling for malformed JSON input error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    errorJSON.message = "please check your input since input is malformed";
    return res.status(400).json(errorJSON);
  }

  // handling for mongoose duplicate entry error
  const errCode = err.code;
  if (errCode === 11000) {
    errorJSON.message = "resource already exists";
    return res.status(409).json(errorJSON);
  }

  // handling for mongoose validation error
  // ideally we should have validation middleware
  if (err.name === "ValidationError") {
    errorJSON.message = err
      .toString()
      .replace("ValidationError: ", "")
      .split(",");
    return res.status(400).json(errorJSON);
  }

  // handling for client errors
  if (errCode !== 500 && errCode !== undefined) {
    errorJSON.message = err.message;
    return res.status(errCode).json(errorJSON);
  }
  logger.error(err);

  // handling for some other yet-to-be discovered error
  return res.status(500).json(errorJSON);
};

module.exports = handleErrors;
