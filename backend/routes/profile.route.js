const express = require("express");
const router = express.Router();
const ProfileController = require('../app/controllers/ProfileController');

router.get("/me", ProfileController.me);
router.put("/update", ProfileController.update);
router.put("/update/password", ProfileController.update_password);

module.exports = router;