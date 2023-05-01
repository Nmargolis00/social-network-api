const router = require('express').Router();
// api/thoughts



const{getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controllers/thoughtsController');

// getting all thoughts and creating a thought
router.route('/').get(getAllThoughts).post(createThought);

// getting a thought by id, updating a thought, and deleting a thought
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// adding a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// removing a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



module.exports = router;