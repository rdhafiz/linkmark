const express = require("express");
const router = express.Router();
const AuthController = require('../app/controllers/authController');

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/forgot/password", AuthController.forgot_password);
router.post("/reset/password", AuthController.reset_password);

module.exports = router;