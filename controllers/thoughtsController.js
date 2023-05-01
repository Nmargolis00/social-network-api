const { log } = require("console");
const { User, Thoughts } = require("../models");

const thoughtsController = {
  //get all thoughts

  async getAllThoughts(req, res) {
    try {
        const thoughts = await Thoughts.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        res.status(200).json(thoughts);
  } catch (err) {
    console.error({message: err});
    return res.status(500).json(err);
  }
  },
  //get one thought by id

  getThoughtById(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
    .then((thoughts) => {
        if(!thoughts) {
          return res.status(404).json({message: "No thought found with this id!"});
        }
        res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //create a new thought

  createThought(req, res) {
    Thoughts.create(req.body)
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(400).json(err));
  },

  //update a thought by id

  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    .then((thoughts) => {
        if(!thoughts) {
            return res.status(404).json({message: "No thought found with this id!"});
        }
        res.json(thoughts);
    })
    .catch((err) => res.status(400).json(err));
  },

  //delete a thought

  deleteThought(req, res) {
    Thoughts.findOneAndDelete({_id: req.params.thoughtId})
    .then((thoughts) => {
        if(!thoughts) {
            return res.status(404).json({message: "No thought found with this id"});
        }
        return User.findOneAndUpdate(
            {thoughts: req.params.thoughtId},
            {$pull: {thoughts: req.params.thoughtId}},
            {new: true}
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: "Not sure why I am getting this message but it is working"});
            }
            res.json({message: "Thought deleted!"})
        })
    })
    .catch((err) => res.status(400).json(err));
  },
  

  //add a reaction

  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {new: true, runValidators: true}
    )
    .then((thoughts) => {
        if(!thoughts) {
            return res.status(404).json({message: "No thought found with this id!"});
        }
        res.json(thoughts);
    })
    .catch((err) => res.status(400).json(err));
  },

  //remove a reaction

  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: {reactionId: req.params.reactionId}}},
        {new: true, runValidators: true}
    )
    .then((thoughts) => {
        if(!thoughts) {
            return res.status(404).json({message: "No thought found with this id!"});
        }
        res.json(thoughts);
    })
    .catch((err) => res.status(400).json(err));
  },
};
module.exports = thoughtsController;
