const express = require("express");
const router = express.Router();
const ResourceController = require('../app/controllers/ResourceController');

router.get("/all", ResourceController.all);
router.post("/create", ResourceController.create);
router.put("/update", ResourceController.update);
router.delete("/delete/:id", ResourceController.delete);

module.exports = router;