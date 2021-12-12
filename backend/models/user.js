const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Как Вас зовут?',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Чем вы занимаетесь?',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://thumbs.dreamstime.com/b/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-line-icon-121102131.jpg',
  },
});

module.exports = mongoose.model('user', userSchema);
