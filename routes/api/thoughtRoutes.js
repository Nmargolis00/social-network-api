const router = require('express').Router();
// api/thoughts

const{getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction} = require('../../controllers/thought-controller');

// getting all thoughts and creating a thought
router.route('/').get(getAllThoughts).post(createThought);

// getting a thought by id, updating a thought, and deleting a thought
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// adding a reaction and removing a reaction
router.route('/:thoughtId/reactions').post(addReaction);

// removing a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



module.exports = router;