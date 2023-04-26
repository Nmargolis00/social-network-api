const router = require('express').Router();
// api/users
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller');


// getting all users and creating a user
router.route('/').get(getAllUsers).post(createUser);

// getting a user by id, updating a user, and deleting a user
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// adding a friend and removing a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;