class BadRequestError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Переданы некорректные данные';
  }
}

module.exports = BadRequestError;
