const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL } = require('./config/server-config');

const rootRoutes = require('./routes/index');

const limiter = rateLimit({
  windowMs: 1000,
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.use('/', rootRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err === null) {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } else {
    console.error(err);
  }
});
