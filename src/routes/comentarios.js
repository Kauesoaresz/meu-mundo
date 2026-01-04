const express = require("express");
const router = express.Router();
const comentariosController = require("../controllers/comentariosController");

router.get("/", (req, res) =>
  comentariosController.index(req, res)
);

router.post("/", (req, res) =>
  comentariosController.store(req, res)
);

module.exports = router;
