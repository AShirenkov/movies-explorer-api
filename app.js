const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Слушаем 3000 порт
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const limiter = require('./utils/expressLimiter');

const route = require('./routes/index');

const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { NODE_ENV, MONGODB_PROD_CON, SERVER_PROD_PORT } = process.env;
const { MONGODB_DEV_CON, SERVER_DEV_PORT } = require('./utils/constants');

const MONGODB_CON = NODE_ENV === 'production' ? MONGODB_PROD_CON : MONGODB_DEV_CON;
const SERVER_PORT = NODE_ENV === 'production' ? SERVER_PROD_PORT : SERVER_DEV_PORT;

// подключаемся к серверу mongo
mongoose.connect(MONGODB_CON, {});

const app = express();
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger); // подключаем логгер запросов

app.use(cors);

app.use(route);
app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(SERVER_PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${SERVER_PORT}`);
});
