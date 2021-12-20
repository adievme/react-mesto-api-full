const jwt = require('jsonwebtoken');

const YOUR_JWT = '73f46652a32978e69a81a4c5234bc5fabff90c9c72b428c5e861daba5f0167da';
// вставьте сюда JWT, который вернул публичный сервер

const SECRET_KEY_DEV = 'some-secret-key';
// вставьте сюда секретный ключ для разработки из кода

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);

    console.log('\x1b[31m%s\x1b[0m', `
      Надо исправить. В продакшне используется тот же
      секретный ключ, что и в режиме разработки.
    `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются'
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err
      );
    }
  }
  next();
}
