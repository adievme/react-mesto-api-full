const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');

const { login, createUser } = require('./controllers/users');
const { userValidate, loginValidate } = require('./validator/validator');
const NotFoundError = require('./errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signin', loginValidate, login);
app.post('/signup', userValidate, createUser);

app.use(routes);
app.use(() => {
  throw new NotFoundError('Ресурс не найден');
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
