const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const NoAuthError = require('../errors/no-auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new NoAuthError('Необходима авторизация'));
      return;
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    next(new NoAuthError('Необходима авторизация'));
  }
};
