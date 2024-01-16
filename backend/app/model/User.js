const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    avatar: {
        type: String,
        required: [false],
    },
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
    },
    gender: {
        type: String,
        required: [false],
        enum: ['Male', 'Female', 'Other']
    },
    reset_code: {
        type: String,
        required: [false]
    },
    activation_code: {
        type: String,
        required: [false]
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);