const express = require("express");
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");
const webRouter = require("./web.route");
const AuthReq = require("../app/middleware/AuthReq")
const router = express.Router();

router.use("", webRouter);
router.use("/auth", authRouter);
router.use("/profile", AuthReq, profileRouter);

module.exports = router;