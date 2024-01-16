const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Validator = require('../helpers/validator');
const UserModel = require('../model/User');
const UserServices = require('../services/UserService');

const ProfileController = {
    me: async (req, res) => {
        try {
            const userId = req.body.auth.id;
            const user = await UserModel.findById(userId).exec();
            console.log(userId, user)

            // Returning a 200 OK response with user data and the generated access token
            res.status(200).json({ data: UserServices.parseData(user)});
        } catch (error) {
            // Handling any unexpected errors and returning a 500 Internal Server Error response
            res.status(500).send(error.message);
        }
    }
};

// Exporting the authentication controller object for use in other modules
module.exports = ProfileController;
