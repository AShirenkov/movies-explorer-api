const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
// const isURL = require('validator/lib/isURL');
const AuthError = require('../errors/auth-error');

const {
  INVALID_EMAIL,
  INVALID_LOGIN,
} = require('../utils/errorMessageConstants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    // имя пользователя, строка от 2 до 30 символов, обязательное поле;
    type: String,
    required: true,

    minlength: 2,
    maxlength: 30,
  },
  // avatar: {

  //   type: String,
  //   validate: {
  //     validator: (v) => isURL(v),
  //     message: 'Неправильный формат ссылки',
  //   },

  //   default:
  //     'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  // },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(INVALID_LOGIN));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError(INVALID_LOGIN));
        }

        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model('user', userSchema);
