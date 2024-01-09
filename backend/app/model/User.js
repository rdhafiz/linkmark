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
    designation: {
        type: String,
        required: [true, 'Designation field is required'],
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
    },
    user_type: {
        type: String,
        required: [true, 'User Type field is required'],
        enum: ['Admin', 'Manager', 'Employee']
    },
    phone: {
        type: String,
        required: [false],
    },
    gender: {
        type: String,
        required: [false],
        enum: ['Male', 'Female', 'Other']
    },
    reset_code: {
        type: String,
        required: [false]
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);