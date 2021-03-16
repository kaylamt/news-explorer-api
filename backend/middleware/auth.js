const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  const { NODE_ENV, JWT_SECRET } = process.env;
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new UnauthorizedError('Authorization Required'));
  }

  req.user = payload;

  return next();
};
