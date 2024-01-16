const express = require("express");
const webRouter = require("./web.route");
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");
const resourceRouter = require("./resource.route");
const AuthReq = require("../app/middleware/AuthReq")
const router = express.Router();

router.use("", webRouter);
router.use("/auth", authRouter);
router.use("/profile", AuthReq, profileRouter);
router.use("/resource", AuthReq, resourceRouter);

module.exports = router;