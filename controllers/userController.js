const {User, Thoughts} = require('../models');
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({}).select('-__v').then(dbUserData => res.json(dbUserData)).catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get one user by id

    getUserById(req, res) {
        User.findOne({_id: req.params.id}).populate({path: 'thoughts', select: '-__v'}).populate({path: 'friends', select: '-__v'}).select('-__v').then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
                
            } 
            res.json(dbUserData);
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create a new user

    createUser (req, res) {
        User.create(req.body).then(dbUserData => res.json(dbUserData)).catch(err => res.status(400).json(err));
    },
    // update a user by id

        updateUser (req, res) {
            User.findOneAndUpdate(
                {_id: req.params.id}, 
                {$set: req.body}, {new: true, runValidators: true}).then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({message: 'No user found with this id!'});
                }
                res.json(dbUserData);
                }).catch(err => res.status(400).json(err));
                console.log(err);
                },
    // delete a user

    deleteUser (req, res) {
        User.findOneAndDelete({_id: req.params.id}).then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            return Thoughts.deleteMany({_id: {$in: dbUserData.thoughts}}).then(() => { res.json({message: 'User and associated thoughts deleted!'});
        })
            .catch(err => {res.status(400).json(err)
            console.log(err)});
            
            

        });
    },
    // add a friend to a user's friend list
    addFriend (req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true, runValidators: true}).then(dbUserData => {
     if(!dbUserData) {
        return res.status(404).json({message: 'No user found with this id!'});
     }
      res.json(dbUserData);})
      .catch(err => res.status(400).json(err));
      console.log(err);
    },
    // remove a friend from a user's friend list

    removeFriend (req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true, runValidators: true}).then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
        console.log(err);
    }
};
    module.exports = userController;