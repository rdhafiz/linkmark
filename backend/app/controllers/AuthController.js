const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Validator = require('../helpers/validator');
const UserModel = require('../model/User');
const UserServices = require('../services/UserService');

const AuthController = {
    login: async (req, res) => {
        try {
            // Defining the schema for request body validation using "Joi"
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            });

            // Validating the request body against the defined schema
            const validator = await schema.validate(req.body);
            // If validation fails, return a 400 Bad Request response with validation errors
            if (validator.error !== undefined) {
                return res.status(400).json(Validator.parseError(validator.error));
            }

            // Finding a user with the provided email in the database
            const user = await UserModel.findOne({ email: req.body.email }).exec();
            // If no user is found, return a 400 Bad Request response indicating invalid credentials
            if (user == null) {
                return res.status(400).json({ email: "Invalid Credential! Please try again." });
            }

            // Comparing the provided password with the hashed password stored in the database
            const hashCheck = await bcrypt.compare(req.body.password, user.password);
            // If the password does not match, return a 400 Bad Request response indicating invalid credentials
            if (!hashCheck) {
                return res.status(400).json({ email: "Invalid Credential! Please try again." });
            }

            // Generating a JWT access token for the authenticated user
            const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            // Returning a 200 OK response with user data and the generated access token
            res.status(200).json({ data: UserServices.parseData(user), access_token: access_token });
        } catch (error) {
            // Handling any unexpected errors and returning a 500 Internal Server Error response
            res.status(500).send(error.message);
        }
    }
};

// Exporting the authentication controller object for use in other modules
module.exports = AuthController;
