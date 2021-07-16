const bycrypt = require('bcrypt');
const mongoose = require('mongoose');
const {conn1} = require('../config/mongoose.config')

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
    }
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

const User = conn1.model('EmployeeUser', UserSchema)

module.exports = User;