const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend
} = require('../../controllers/userController');

// /api/users
router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addUserFriend)
  .delete(removeUserFriend);

module.exports = router;