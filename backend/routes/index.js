const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const auth = require('../middleware/auth');

const articleRoutes = require('./articles');
const userRoutes = require('./users');

router.post('/api/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);

router.use('/api/articles', articleRoutes);
router.use('/api/users', userRoutes);

router.use((_req, res) => {
  res.statusCode = 404;
  res.json({ message: 'Requested resource not found' });
});

module.exports = router;
