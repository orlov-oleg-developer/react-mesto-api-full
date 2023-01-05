const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const NoAuthError = require('../errors/no-auth-error');

const checkToken = (token) => {
  const YOUR_JWT = token;
  const SECRET_KEY_DEV = 'some-secret-key';
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
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new NoAuthError('Необходима авторизация'));
      return;
    }

    const token = authorization.replace('Bearer ', '');
    checkToken(token);
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    req.user = payload;
    next();
  } catch (e) {
    next(new NoAuthError('Необходима авторизация'));
  }
};
