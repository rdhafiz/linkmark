const express = require("express");
const router = express.Router();
const ProfileController = require('../app/controllers/ProfileController');

router.get("/me", ProfileController.me);
router.put("/update", ProfileController.update);
router.put("/update/password", ProfileController.update_password);
router.post("/activate", ProfileController.activate_account);
router.get("/activation/resend", ProfileController.activation_resend);

module.exports = router;