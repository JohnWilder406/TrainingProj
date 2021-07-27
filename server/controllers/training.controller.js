const Training = require("../models/training.model");

module.exports.createTraining = (req,res) => {
    const {name, duration, difficulty} = req.body;
    Training.create({
        name,
        difficulty,
        duration
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

// module.exports.getWorkout = (req, res) => {
//     Training.findById(req.params.id)
//         .then(workout => res.json(workout))
//         .catch(err => res.json(err))
// }

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

module.exports.updateWorkout = (req, res) => {
    Training.updateOne({'workouts._id': req.params.id},
        {'$set': {
            'workouts.$.name': req.body.workout.name,
            'workouts.$.duration': req.body.workout.duration,
            'workouts.$.intensity': req.body.workout.intensity,
            'workouts.$.difficulty': req.body.workout.difficulty,
            'workouts.$.frequency': req.body.workout.frequency
        }})
        .then(updatedWorkout => res.json(updatedWorkout))
        .catch(err => res.json(err))
}


module.exports.deleteWorkout = (req, res) => {
    Training.findByIdAndUpdate(
        req.params.id, {
            $pull: {
                "workouts": {_id: req.params.workoutid}
            }
        }, {safe: true, upsert: true},
    )
        .then(updatedPlan => res.json(updatedPlan))
        .catch(err => res.json(err))
}