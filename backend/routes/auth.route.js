const express = require("express");
const router = express.Router();
const AuthController = require('../app/controllers/authController');

router.get("/register", AuthController.register);
router.get("/login", AuthController.login);

module.exports = router;