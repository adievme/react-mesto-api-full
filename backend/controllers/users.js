const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      throw new ConflictError('Такой email уже зарегистрирован');
    }
    return bcrypt.hash(password, 10);
  })
    .then((hash) => User.create({
      password: hash,
      email,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не создан');
      }
      res.status(201).send({
        _id: user.id,
        email,
        name,
        about,
        avatar,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          res.send({ token });

          return token;
        });
    })
    .catch((err) => {
      next(new UnAuthorizedError(err.message));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }, // обработчик then получит на вход обновлённую запись
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }, // обработчик then получит на вход обновлённую запись
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  login,
  getUser,
  getUsers,
  updateUser,
  createUser,
  getCurrentUser,
  updateUserAvatar,
};
