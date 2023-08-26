const router = require('express').Router();

const routerUsers = require('./users');

const routerMovies = require('./movies');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');
const {
  checkSignin,
  checkSignup,
} = require('../middlewares/requestValidation');

// router.get("/crash-test", () => {
//   setTimeout(() => {
//     throw new Error("Сервер сейчас упадёт");
//   }, 0);
// });

router.post('/signin', checkSignin, login);
router.post('/signup', checkSignup, createUser);
router.use(auth);

router.use('/users', routerUsers); // запускаем
// router.use("/cards", routerCards); // запускаем
router.use('/movies', routerMovies); // запускаем
router.use('/', (req, res, next) => {
  next(new NotFoundError('Такого адреса не существует'));
});

module.exports = router;
