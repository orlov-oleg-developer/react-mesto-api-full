const router = require('express').Router();

const {
  userIdValidator, userNameAboutValidator, userAvatarValidator,
} = require('../utils/requests-validators');

const {
  getUsers, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get(
  '/:userId',
  userIdValidator,
  getUser,
);
router.patch(
  '/me',
  userNameAboutValidator,
  updateUserInfo,
);
router.patch(
  '/me/avatar',
  userAvatarValidator,
  updateUserAvatar,
);

module.exports = router;
