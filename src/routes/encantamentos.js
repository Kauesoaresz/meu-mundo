const express = require("express");
const router = express.Router();
const encantamentosController = require("../controllers/encantamentosController");

router.get("/", encantamentosController.index);

module.exports = router;