const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const error = require('./middleware/error');
const limiter = require('./middleware/limiter');
const routes = require('./routes/index.js');
const config = require('./config');

const port = 3000;

const app = express();

app.use(cors());

app.use(helmet());

const { NODE_ENV, MONGOOSE_URL } = process.env;
const mongooseUrl = NODE_ENV === 'production' ? MONGOOSE_URL : config.mongooseUrl;

mongoose.connect(mongooseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use(limiter);

app.use(routes);

app.use(requestLogger);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(port);
