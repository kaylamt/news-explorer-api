const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const error = require('./middleware/error');
const routes = require('./routes/index.js');

const port = 3000;

const app = express();

app.use(cors());

app.use(helmet());

mongoose.connect('process.env.mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use(routes);

app.use(requestLogger);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(port);
