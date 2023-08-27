// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://ashir84.diplom.nomoredomainsicu.ru',
  'http://ashir84.diplom.nomoredomainsicu.ru',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    const requestHeaders = req.headers['access-control-request-headers'];
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
