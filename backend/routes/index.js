const express = require('express');

const router = express.Router();
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { createUser, login } = require('../controllers/users');
const auth = require('../middleware/auth');
const error = require('../middleware/error');
const { requestLogger, errorLogger } = require('../middleware/logger');

const articleRoutes = require('./articles');
const userRoutes = require('./users');

router.use(cors());

router.use(helmet());

router.use(express.json());

router.use(requestLogger);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);

router.use('/articles', articleRoutes);
router.use('/users', userRoutes);

router.use(errorLogger);

router.use(errors());

router.use(error);

router.use((_req, res) => {
  res.statusCode = 404;
  res.json({ message: 'Requested resource not found' });
});

module.exports = router;
