require('dotenv').config();

console.log(process.env);
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimiterUsingThirdParty } = require('./middlewares/rateLimit');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3002 } = process.env; // TODO: перенести в config.js
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb'); // TODO: перенести в config.js

const app = express();
app.use(cors());

app.use(requestLogger);
app.use(bodyParser.json());
app.use(helmet());
app.use(rateLimiterUsingThirdParty);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
