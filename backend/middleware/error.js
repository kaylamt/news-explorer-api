const constants = require('../utils/constants');

module.exports = (err, _req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? constants.serverErr
        : message,
    });
};
