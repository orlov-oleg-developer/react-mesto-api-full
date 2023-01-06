require('dotenv').config();

const {
  PORT = 3000,
  NODE_ENV,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key';

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
};
