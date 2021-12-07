const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  getCurrentUser,
  updateUserAvatar,
} = require('../controllers/users');

const {
  userUpdateValidate,
  avatarUpdateValidate,
  idValidate,
} = require('../validator/validator');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', idValidate, getUser);
router.patch('/me', userUpdateValidate, updateUser);
router.patch('/me/avatar', avatarUpdateValidate, updateUserAvatar);

module.exports = router;
