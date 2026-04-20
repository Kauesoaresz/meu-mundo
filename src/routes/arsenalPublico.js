const express = require("express");
const router = express.Router();
const arsenalPublicoController = require("../controllers/arsenalPublicoController");

router.get("/", arsenalPublicoController.index);

module.exports = router;