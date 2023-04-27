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
    User.findOne({ _id: req.params.id })
    .populate({
      path: "thoughts",
      select: "-__v",
    })
    .then((dbUserData) => {
        if(!dbUserData) {
          return res.status(404).json({message: "No user found with this id!"});
        }
        res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //create a new thought

  createThought(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
  },

  //update a thought by id

  updateThought(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.status(404).json({message: "No user found with this id!"});
        }
        res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
    console.log(err);
  },

  //delete a thought

  deleteThought(req, res) {
    User.findOneAndDelete({_id: req.params.id})
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.status(404).json({message: "No user found with this id!"});
        }
    })
    .catch((err) => res.status(400).json(err));
    console.log(err);
  },

  //add a reaction

  addReaction(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.id},
        {$addToSet: {reactions: req.body}},
        {new: true, runValidators: true}
    )
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.status(404).json({message: "No user found with this id!"});
        }
        res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
    console.log(err);
  },

  //remove a reaction

  removeReaction(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.id},
        {$pull: {reactions: {reactionId: req.params.reactionId}}},
        {new: true, runValidators: true}
    )
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.status(404).json({message: "No user found with this id!"});
        }
        res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
    console.log(err);
  },
};
module.exports = thoughtsController;
