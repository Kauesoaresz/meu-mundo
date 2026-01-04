const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

router.post("/comentarios/:postId", comentarioController.criar);

module.exports = router;
