const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Validator = require('../helpers/validator');
const UserModel = require('../model/User');
const UserServices = require('../services/UserService');
const Mailer = require("../../config/mailer");

const ProfileController = {

    me: async (req, res) => {
        try {
            const userId = req.body.auth.id;
            const user = await UserModel.findById(userId).exec();
            console.log(userId, user)

            // Returning a 200 OK response with user data and the generated access token
            res.status(200).json({data: UserServices.parseData(user)});
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
    },

    activate_account: async (req, res) => {
        try {
            const schema = Joi.object({
                activation_code: Joi.string().alphanum().min(6).required(),
                auth: Joi.required(),
            });
            const validator = await schema.validate(req.body);
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            const userId = req.body.auth.id;
            const user = await UserModel.findById(userId).exec();
            if (user.activation_code == null) {
                return res.status(400).json({activation_code: "Your account has already been activated."});
            } else if (user.activation_code != req.body.activation_code) {
                return res.status(400).json({activation_code: "Invalid Activation Code!"});
            }

            await UserModel.updateOne({_id: userId}, {activation_code: null})

            res.status(200).json({msg: "Account has been activated successfully."});
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    activation_resend: async (req, res) => {
        try {
            const schema = Joi.object({
                auth: Joi.required(),
            });
            const validator = await schema.validate(req.body);
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            const userId = req.body.auth.id;
            const user = await UserModel.findById(userId).exec();
            if (user.activation_code == null) {
                return res.status(400).json({activation_code: "Your account has already been activated."});
            }

            const activation_code = Math.random().toString().substr(2, 6)
            await UserModel.updateOne({_id: userId}, {activation_code: activation_code})
            const mailContext = {
                name: user.name,
                activation_code: activation_code
            }
            const to = user.name + ` <${user.email}>`;
            await Mailer.sent(to, 'Account Activation', mailContext, 'activation');

            res.status(200).json({msg: "A new 6-digit account activation code has been sent to you email."});
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

};

// Exporting the authentication controller object for use in other modules
module.exports = ProfileController;
