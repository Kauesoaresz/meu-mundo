const express = require("express");
const router = express.Router();

const afazerController = require("../controllers/afazerController");

router.get("/", afazerController.index);

module.exports = router;
