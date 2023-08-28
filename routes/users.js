const router = require('express').Router(); // создали роутер

const { getCurrentUser, updateProfile } = require('../controllers/users');

const { checkUserInfo } = require('../middlewares/requestValidation');

// в макете мы можем задавать только имя, почта и пароль. комментируем лишнее
// router.get('/', getUsers);
router.get('/me', getCurrentUser);

// router.get('/:userId', checkUserID, getUserById);
// router.post('/', createUser);
// router.patch('/me/avatar', checkUserAvatar, updateAvatar);
router.patch('/me', checkUserInfo, updateProfile);
module.exports = router;
