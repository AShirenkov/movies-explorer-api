const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
// Слушаем 3000 порт
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const route = require('./routes/index');

const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger); // подключаем логгер запросов

app.use(cors);

app.use(route);
app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
