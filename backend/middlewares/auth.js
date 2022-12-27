const jwt = require('jsonwebtoken');

const NoAuthError = require('../errors/no-auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new NoAuthError('Необходима авторизация'));
      return;
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
    next();
  } catch (e) {
    next(new NoAuthError('Необходима авторизация'));
  }
};
