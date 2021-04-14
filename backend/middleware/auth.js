const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
require('dotenv').config();
const config = require('../config');
const constants = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('lajdl;kj', req.headers);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(constants.unauthorizedErr));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  const { NODE_ENV, JWT_SECRET } = process.env;
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : config.jwtSecret;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new UnauthorizedError(constants.unauthorizedErr));
  }

  req.user = payload;

  return next();
};
