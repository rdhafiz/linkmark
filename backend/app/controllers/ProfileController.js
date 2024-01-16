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
    },
    update: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().min(6).required(),
                auth: Joi.required(),
            });
            const validator = await schema.validate(req.body);
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            const userId = req.body.auth.id;
            await UserModel.updateOne({_id: userId}, {name: req.body.name});

            res.status(200).json({msg: "Profile has been updated successfully."});
        } catch (error) {
            // Handling any unexpected errors and returning a 500 Internal Server Error response
            res.status(500).send(error.message);
        }
    },
    update_password: async (req, res) => {
        try {
            const schema = Joi.object({
                current_password: Joi.string().min(6).required(),
                password: Joi.string().min(6).required(),
                password_confirmation: Joi.ref('password'),
                auth: Joi.required(),
            });
            const validator = await schema.validate(req.body);
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            const userId = req.body.auth.id;
            const user = await UserModel.findById(userId).exec();

            const hashCheck = await bcrypt.compare(req.body.current_password, user.password);
            if (!hashCheck) {
                return res.status(400).json({current_password: "Invalid Password! Please try again."});
            }

            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(req.body.password, salt);
            await UserModel.updateOne({_id: userId}, {password: password, reset_code: null})

            res.status(200).json({msg: "Password has been updated successfully."});
        } catch (error) {
            // Handling any unexpected errors and returning a 500 Internal Server Error response
            res.status(500).send(error.message);
        }
    }
};

// Exporting the authentication controller object for use in other modules
module.exports = ProfileController;
