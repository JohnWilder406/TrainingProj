const mongoose = require('mongoose');
const {conn2} = require('../config/mongoose.config')
const uniqueValidator = require('mongoose-unique-validator');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "Workout name is required"]
    },
    duration: {
        type: Number,
    },
    intensity: {
        type: String,
    },
    difficulty: {
        type: String
    },
    frequency: {
        type: Number
    }
})

const TrainingSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "Training Plan Name is required"],
    },

    difficulty: {
        type: String,
        required: [true, "Difficulty level is required"]
    },

    duration: {
        type: Number,
        required: [true, "Plan must have a duration"]
    },

    workouts: [WorkoutSchema],

}, {timestamps: true});

TrainingSchema.plugin(uniqueValidator, {message: 'Error: product name must be unique'})

const trainingModel = conn2.model('Training', TrainingSchema);

module.exports = trainingModel;