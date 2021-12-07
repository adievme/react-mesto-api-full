const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

const userValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{2,32})[^\s@]*/),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarUpdateValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{2,32})[^\s@]*/).required(),
  }),
});

const idValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validateURL = (value) => {
  const result = isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Неправильный формат ссылки');
};

const cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

module.exports = {
  userValidate,
  loginValidate,
  userUpdateValidate,
  avatarUpdateValidate,
  idValidate,
  cardValidate,
};
