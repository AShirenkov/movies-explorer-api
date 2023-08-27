const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { ERROR_AUTH } = require('../utils/errorMessageConstants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(ERROR_AUTH));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    return next(new AuthError(ERROR_AUTH));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
