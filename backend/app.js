const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');

const rootRoutes = require('./routes/index');
const path = require("path");

const limiter = rateLimit({
  windowMs: 1000,
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/', rootRoutes);

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

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
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
