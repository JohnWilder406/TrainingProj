const bycrypt = require('bcrypt');
const mongoose = require('mongoose');
const {conn1} = require('../config/mongoose.config')

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Workout name is required"]
    },
    startdate: {
        type: Date,
        required: [true, "Starting date is required"]
    },
    number: {
        type: Number
    },
    complete: {
        type: Boolean
    },
    duration: {
        type: Number
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

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "Too few characters"]

    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [3, "Too few characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be 8 characters or longer"]
    },

    training: {
        type: String,
    },

    workouts: [WorkoutSchema],

    birthday: {
        type: Date,
    },

    height: Number,
    weight: Number,

    admin: Boolean


}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
})

UserSchema.pre('save', function(next) {
    bycrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = conn1.model('User', UserSchema)

module.exports = User;