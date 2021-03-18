const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const error = require('./middleware/error');
const { requestLogger, errorLogger } = require('./middleware/logger');

const port = 3000;

const articleRoutes = require('./routes/articles');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/articles', articleRoutes);
app.use('/users', userRoutes);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.use((_req, res) => {
  res.statusCode = 404;
  res.json({ message: 'Requested resource not found' });
});

app.listen(port);
