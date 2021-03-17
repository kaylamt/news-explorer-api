const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const error = require('./middleware/error');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(helmet());

const port = 3000;

const articleRoutes = require('./routes/articles');
const userRoutes = require('./routes/users');

app.use(express.json());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/articles', articleRoutes);
app.use('/users', userRoutes);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(port);
