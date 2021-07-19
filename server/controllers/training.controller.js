const Training = require("../models/training.model");

module.exports.createTraining = (req,res) => {
    const {name, duration, difficulty, workouts} = req.body;
    Training.create({
        name,
        duration,
        difficulty,
        workouts
    })
        .then(plan=> res.json(plan))
        .catch(err => res.json(err))
}

module.exports.getAllTraining = (req,res) => {
    Training.find({})
        .then(plans => res.json(plans))
        .catch(err => res.json(err))
}

module.exports.getTraining = (req,res) => {
    Training.findOne({_id: req.params.id})
        .then(plan => res.json(plan))
        .catch(err => res.json(err))
}

module.exports.updateTraining= (req, res) => {
    Training.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
        context: "query"
    })
        .then(updatedPlan => res.json(updatedPlan))
        .catch(err => res.json(err))
}

module.exports.deleteTraining = (req,res) => {
    Training.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

module.exports.createWorkout= (req, res) => {
    Training.updateOne({'_id': req.params.id},
        {$push: {
            workouts: req.body.workout
        }})
        .then(updatedPlan => res.json(updatedPlan))
        .catch(err => res.json(err))
}