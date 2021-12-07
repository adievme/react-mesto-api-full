const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnAuthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    const error = new Error('Присланный токен некорректен');
    error.statusCode = 401;
    next(error);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
