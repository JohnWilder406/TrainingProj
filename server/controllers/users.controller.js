const bcrypt = require('bcrypt');
const User = require("../models/users.model");
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        const user = new User(req.body)
        console.log(user);
        user.save()
            .then((user) => {
                console.log("successfully registered");
                res.json({ message: "Successfully Registered!", user: user })
            })
            .catch((err) => {
                console.log("register not successful", err);
                res.json(err)
            })
    },

    login: (req, res) => {
        console.log(req.body);

        User.findOne({ email: req.body.email  })
            .then((userRecord) => {
                if(userRecord === null) {
                    res.status(400).json({ message: "email address not found" })
                } else {
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((passwordValid) => {
                            if(passwordValid) {
                                console.log("password is valid");
                                res
                                    .cookie("usertoken", 
                                    jwt.sign({
                                        user_id: userRecord._id, 
                                        username: userRecord.firstName
                                    }, process.env.JWT_SECRET),
                                    {
                                        expires: new Date(Date.now() + 9000000), httpOnly: true
                                    }                            
                                    )
                                    .json({
                                        message: "Successfully logged in",
                                        userLoggedIn: userRecord.firstName,
                                    })
                            } else {
                                res.status(400).json({message: "password doesn't match"})
                            }
                        })
                }
            })
            .catch((err) => {
                console.log("login not successful");
                res.json(err)
            })
    },

    logout: (req, res) => {
        console.log("logged out!");
        res.clearCookie("usertoken")
        res.json({message: "You have successfully logged out!"});
    },

    //use this controller to update profile 
    update: (req,res) => {
        User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            context: "query"
        })
            .then(updatedUser => res.json(updatedUser))
            .catch(err => res.json(err))
    },

    get: (req,res) => {
        User.findOne({_id: req.params.id})
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    //use this controller to add workouts to array
    add: (req, res) => {
        User.updateOne({'_id': req.params.id},
        {$push: {
            workouts: req.body.workout
        }})
        .then(updatedWorkout => res.json(updatedWorkout))
        .catch(err => res.json(err))
    },

    //use this controller to change number of workouts left
    complete: (req, res) => {
        User.updateOne({'workouts._id': req.params.workoutid},
        {'$set': {
            'workouts.$.number': req.body.number
        }})
        .then(updatedWorkout => res.json(updatedWorkout))
        .catch(err => res.json(err))
    },



    //use this controller to switch complete from false to true (not sure if we need this- i'll build it if needed)
}